public class JsEvent {
    public string MessageText = string.Empty;

    public void ShowTest(string text) {
        MessageBox.Show(text);
    }
}


public void InitBrowser() {
    Cef.EnableHighDPISupport();


    CefSettings settings = new CefSettings();
    settings.CefCommandLineArgs.Add("disable-gpu", "1");

    browser = new ChromiumWebBrowser("http://127.0.0.1:8080/");

    this.Controls.Add(browser);

    browser.Dock = DockStyle.Fill;

    browser.RegisterJsObject("jsObj", new JsEvent());
}
