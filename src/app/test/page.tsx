// nextjs routing notes:
//      create a folder
//      if you make a page.tsx file, it will be accessible at '/foldername/'
//      page.tsx is how you publicly access it thru the url, without it its just a folder of components
//      layout.tsx file will be used as the parent of page.tsx
//      ex: this page is accessible at "localhost:3000/test"

export default function Test() {
    return <div><h1>hello</h1></div>
}