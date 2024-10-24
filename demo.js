$(document).ready(function () 
{
    $("#uiGen").click(GenPDF);
        
});

function GenPDF()
{
    // Get the text (vary this)
    let txt = $("#uiTxt").val();
 
    // Get jsPDF object
    const { jsPDF } = window.jspdf;
    
    // Create a document
    var doc = new jsPDF('p', 'mm', 'letter', true); 

    // Write out the text
    doc.text(txt, 10, 10);

    // Set the filename
    let file = $("#uiRnd").prop('checked') ? crypto.randomUUID() : "mypdf"; 

    if (iOS())
    {
        // Create an anchor
        let a = document.createElement("a") 

        // Set anchor properties
        a.download = file;	
        a.href = doc.output('bloburl');

        // Simulate a click
        a.click();

        // Remove the anchor again
        document.body.removeChild(a)
    }
    else
    {
        // A random name is always generated automatically on Windows-Chrome 
        window.open(doc.output('bloburl'));   
    }
}

function iOS() 
{
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}