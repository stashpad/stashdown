import { describe, it } from "vitest";
import { expect } from "expect";
import { converter } from "./markdownConverter";
import { generateChunks } from "./generateChunks";

describe('generateChunks', () => {
  it('renders code blocks with new lines and spaces correctly', () => {
    // specifically there are spaces before the fmt.Printf
    const sample = `\`\`\`go
package main
import "fmt"
func main() {
    fmt.Printf("Hello World")
}

something?
    \`\`\``

    const chunks = generateChunks(sample)
    console.log('chunks', chunks)
    expect(chunks.length).toBe(1)
  })

  it('renders code blocks with new lines and tabs correctly', () => {
    // specifically there are spaces before the fmt.Printf
    const sample = `\`\`\`go
package main
import "fmt"
func main() {
  fmt.Printf("Hello World")
}

something?
    \`\`\``

    const chunks = generateChunks(sample)
    console.log('chunks', chunks)
    expect(chunks.length).toBe(1)
  })
})
