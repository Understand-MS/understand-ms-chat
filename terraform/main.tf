data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

data "azurerm_client_config" "current" {}

resource "azurerm_static_web_app" "main" {
    name = var.app_name
    resource_group_name = data.azurerm_resource_group.main.name
    location = var.static_web_location
    sku_tier = "Free"
}