package main

import (
	"log"
	"net/http"
)

func main() {
    http.Handle("/", http.FileServer(http.Dir("/app/dist")))

    log.Fatal(http.ListenAndServe(":8080", nil))
}
