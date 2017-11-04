public void InitBrowser() {
    Cef.EnableHighDPISupport();


    CefSettings settings = new CefSettings();
    settings.CefCommandLineArgs.Add("disable-gpu", "1");

    browser = new ChromiumWebBrowser("http://114.115.208.88:8080/spterp/admin/index.html");

    this.Controls.Add(browser);

    browser.Dock = DockStyle.Fill;
}
