package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("gateway service running"))
	})

	log.Println("starting Gateway service on port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Error starting Gateway service: %s", err)
	}
}
