use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello from greet, {}!", name));
}

#[wasm_bindgen]
pub fn greet2(name: &str) {
    alert(&format!("Hi from greet2, {}", name));
}
