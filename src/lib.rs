use neon::prelude::*;
pub mod dir2json;
pub mod qrcode;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}
// fn get_num_cpus(mut cx: FunctionContext) -> JsResult<JsNumber> {
//     Ok(cx.number(num_cpus::get() as f64))
// }
fn get_num_cpus(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let input = cx.argument::<JsNumber>(0)?.value(&mut cx);  
    Ok(cx.number(input))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("get", get_num_cpus)?;
    cx.export_function("generate", dir2json::generateExport)?;
    cx.export_function("qrcode",qrcode::createQrCode);
    // generateJsonFile("rust-umi-generate", "./react-umi", "okok.js")
    Ok(())
}
