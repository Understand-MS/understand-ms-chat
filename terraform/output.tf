output "azure_static_web_url" {
    value = azurerm_static_web_app.main.default_host_name
}