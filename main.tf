terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.15.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "practica7" {
  name         = "fraced97/pareja6:lts"
  keep_locally = false
}

resource "docker_container" "pareja6" {
  image = docker_image.practica7.name
  name  = "pareja6"
  ports {
    internal = 80
    external = 80
  }
}