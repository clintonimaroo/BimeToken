const { PDFDocument } = require('pdf-lib')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { method } = request
  if (method === 'POST') {
    const data = await request.json()
    const pdfBuffer = await generateCV(data)
    return new Response(pdfBuffer, {
      headers: { 'Content-Type': 'application/pdf' },
    })
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }
}

async function generateCV(data) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()

  page.drawText(`Name: ${data.name}`, { x: 50, y: 700 })
  page.drawText(`Experience: ${data.experience}`, { x: 50, y: 650 })
  page.drawText(`Education: ${data.education}`, { x: 50, y: 600 })
  page.drawText(`Skills: ${data.skills}`, { x: 50, y: 550 })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
