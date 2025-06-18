use std::time::Duration;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{Emitter, Window};
use tokio::time::sleep;
use std::sync::Arc;
use pyo3::prelude::*;
// use pyo3::types::{PyDict, PyTuple};
use pyo3_ffi::c_str;
use numpy::{PyArray2, PyArrayMethods};

mod params;

// Wrap a callback as a Python class
#[pyclass]
struct RustCallback {
    window: Arc<Window>,
}

#[pymethods]
impl RustCallback {
    fn __call__(&self, arr: &pyo3::Bound<'_, PyArray2<f64>>) -> PyResult<()> {
        let data = unsafe { arr.as_slice()? }.to_vec();
        self.window
            .emit("update_plot", serde_json::json!({ "heatmap": data }))
            .unwrap();
        Ok(())
    }
}

#[tauri::command]
async fn specsim_optimization(window: Window, params: params::OptimizationParams) -> Result<String, String> {
  let json = serde_json::to_string_pretty(&params)
    .map_err(|e| format!("Failed to serialize params: {}", e))?;
  println!("{}", json);

  let _window = Arc::new(window);
  let result_string = Python::with_gil(|py| {
    let module_result = PyModule::from_code(
      py,
      c_str!("def hello():\n  print('Hello World!')"),
      c_str!(""),
      c_str!("")
    );
    if let Ok(module) = module_result {
      let fun = module.getattr("hello").unwrap();
      match fun.call0() {
        Ok(val) => format!("{:?}", val),
        Err(e) => {
          e.print(py);
          "Python call failed".to_string()
        }
      }
    } else if let Err(e) = module_result {
      e.print(py);
      "Module creation failed".to_string()
    } else {
      "Unknown error".to_string()
    }
  });

  Ok(result_string)
}

#[tauri::command]
fn greet() -> String {
  let now = SystemTime::now();
  let epoch_ms = now.duration_since(UNIX_EPOCH).unwrap().as_millis();
  format!("Hello world from Rust! Current epoch: {}", epoch_ms)
}

#[tauri::command]
async fn run_optimization(window: Window) -> Result<String, String> {
  // Simulate a long-running task with progress updates
  for i in 0..=100 {
    // Emit progress to the frontend
    window
      .emit("optimization-progress", i)
      .map_err(|e| format!("Failed to emit progress: {}", e))?;

    // Simulate work
    sleep(Duration::from_millis(50)).await;
  }

  // Return the final result
  Ok("Optimization complete! Results are ready.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet, specsim_optimization, run_optimization])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
