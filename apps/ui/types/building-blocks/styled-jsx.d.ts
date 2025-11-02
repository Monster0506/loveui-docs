import "react"

declare module "react" {
  interface StyleHTMLAttributes<T>
    // Allow styled-jsx props on <style> tags
    extends React.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}
