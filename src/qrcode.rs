use qrcode::{QrCode, Version, EcLevel};
use qrcode::render::svg;
use image::Luma;
use image::{ImageBuffer, Rgb};
use neon::prelude::*;
use std::fs;

pub fn path_exists(path: &str) -> bool {
    fs::metadata(path).is_ok()
}

pub fn createQrCode(mut cx: FunctionContext)->JsResult<JsString>{
    // Encode some data into bits.
    let code = QrCode::new(b"https://franxxdaryl.site/dist/mmd-engine/mmd.html").unwrap();

    // Render the bits into an image.
    let image = code.render::<Luma<u8>>().build();
    // Save the image.
    if path_exists("./tmp") {
        image.save("./tmp/qrcode.png").unwrap();
    } else {
        fs::create_dir_all("./tmp");
        image.save("./tmp/qrcode.png").unwrap();
    }
    Ok(cx.string("success"))
}