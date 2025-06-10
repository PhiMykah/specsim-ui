// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::time::{SystemTime, UNIX_EPOCH};
use std::process::{Command, Stdio};
use std::io::Write;

#[tauri::command]
fn greet() -> String {
  let now = SystemTime::now();
  let epoch_ms = now.duration_since(UNIX_EPOCH).unwrap().as_millis();
  format!("Hello world from Rust! Current epoch: {}", epoch_ms)
}

#[tauri::command]
fn submit_params(params: serde_json::Value) -> Result<String, String> {
  // Path to the Python script
  let script_path = "../src-py/process.py";

  // Spawn the Python process
  let mut process = Command::new("python")
  .arg(script_path)
  .stdin(Stdio::piped())
  .stdout(Stdio::piped())
  .spawn()
  .map_err(|e| format!("Failed to start Python process: {}", e))?;

  // Write the JSON data to the Python script's stdin
  if let Some(stdin) = process.stdin.as_mut() {
    stdin
        .write_all(params.to_string().as_bytes())
        .map_err(|e| format!("Failed to write to Python stdin: {}", e))?;
  }

  // Read the output from the Python script
  let output = process
  .wait_with_output()
  .map_err(|e| format!("Failed to read Python output: {}", e))?;

  if output.status.success() {
      let result = String::from_utf8(output.stdout)
          .map_err(|e| format!("Failed to parse Python output: {}", e))?;
      Ok(result)
  } else {
      let error = String::from_utf8(output.stderr)
          .map_err(|e| format!("Failed to parse Python error output: {}", e))?;
      Err(error)
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet])
    .invoke_handler(tauri::generate_handler![submit_params])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
