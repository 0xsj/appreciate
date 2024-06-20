package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Users Service"))
	})

	log.Println("Starting Users service on port 8081...")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatalf("Error starting Users service: %s", err)
	}
}
