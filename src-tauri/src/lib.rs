use std::time::{SystemTime, UNIX_EPOCH};
use tauri::{Emitter, Window};
use std::time::Duration;
use tokio::time::sleep;

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
        window.emit("optimization-progress", i)
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
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet])
    .invoke_handler(tauri::generate_handler![run_optimization])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
