include 'docker'

docker::image {'fraced97/pareja6':
    image_tag => 'latest'
}

docker::run{'pruebas':
    image   => 'fraced97/pareja6',
    ports   => ['8083:80']
}