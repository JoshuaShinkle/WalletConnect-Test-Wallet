package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Println("From: ", os.Args[1])
	fmt.Println("To: ", os.Args[2])
	fmt.Println("Gas Price: ", os.Args[3])
	fmt.Println("Gas: ", os.Args[4])
	fmt.Println("Value: ", os.Args[5])
	fmt.Println("Nonce: ", os.Args[6])
	fmt.Println("Data: ", os.Args[7])
}
