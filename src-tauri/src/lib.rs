use std::time::{SystemTime, UNIX_EPOCH};
// use tauri::Window;
// use tokio::process::Command;
// use tauri::Manager; // Required for `emit`

#[tauri::command]
fn greet() -> String {
  let now = SystemTime::now();
  let epoch_ms = now.duration_since(UNIX_EPOCH).unwrap().as_millis();
  format!("Hello world from Rust! Current epoch: {}", epoch_ms)
}

// #[tauri::command]
// async fn run_optimization(window: Window, params: serde_json::Value) -> Result<String, String> {
//   let serialized = serde_json::to_string(&params).map_err(|e| e.to_string())?;

//   let mut child = Command::new("python")
//         .arg("src-py/optimizer.py") // adjust this path as needed
//         .stdin(std::process::Stdio::piped())
//         .stdout(std::process::Stdio::piped())
//         .spawn()
//         .map_err(|e| format!("Failed to start Python script: {}", e))?;

//   // Pass the parameters via stdin
//   if let Some(mut stdin) = child.stdin.take() {
//       use tokio::io::AsyncWriteExt;
//       stdin.write_all(serialized.as_bytes()).await.map_err(|e| e.to_string())?;
//   }

//   let stdout = child.stdout.take().ok_or("Failed to open stdout")?;
//   use tokio::io::{AsyncBufReadExt, BufReader};
//   let mut reader = BufReader::new(stdout).lines();

//   // Stream each line back to the frontend
//   while let Some(line) = reader.next_line().await.map_err(|e| e.to_string())? {
//       window.emit("spectrum_update", line.clone()).map_err(|e| e.to_string())?;
//   }

//   Ok("Optimization complete".to_string())

// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet])
    .invoke_handler(tauri::generate_handler![])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
