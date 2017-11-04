public void InitBrowser() {
    Cef.EnableHighDPISupport();


    CefSettings settings = new CefSettings();
    settings.CefCommandLineArgs.Add("disable-gpu", "1");

    browser = new ChromiumWebBrowser("...");

    this.Controls.Add(browser);

    browser.Dock = DockStyle.Fill;
}
