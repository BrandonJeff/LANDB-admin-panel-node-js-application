const http = require('http-server');
const express = require("express");
var fs = require("fs");
const app = express();
var bodyParser = require("body-parser");
const Discord = require("discord.js");
const IPV4 = "192.168.1.63"
const fileUpload = require('express-fileupload');
const token = ""
const client = new Discord.Client();
const Lib = ["SKU", "DATE CREATED", "BRAND", "DESCRIPTION", "CATEGORY", "QTY OF REG PACKS", "QTY OF PLUS PACKS", "REGULAR SIZE RUN", "PLUS SIZE RUN", "FABRICATION", "PP SAMPLE (Y/N)", "PP SAMPLE SIZE", "DESIGNER", "VENDOR", "SHIP DATE", "NO LATER THAN", "SHIPPING METHOD", "STATUS"]
const LibA = ["SKU", "DATE CREATED", "BRAND", "DESCRIPTION", "CATEGORY", "BREAKDOWN FOR BOX", "BOX PACK", "ORDER", "PP SAMPLE (Y/N)", "PP SAMPLE SIZE", "DESIGNER", "VENDOR", "SHIP DATE", "NO LATER THAN", "SHIPPING METHOD", "STATUS"]
var Jimp = require("jimp");
var sourcec = 0;
var uploadc = 0;
var GoogleSpreadsheet = require('google-spreadsheet');
var assignments = [];
var creds = require('./client_secret.json');
var tempt = 0;
app.use(fileUpload());

// Create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1-fzrTkEqtPG2s41UIIG2iso8qYNB4KpiFbqoBv8Zh8U');

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

app.use(bodyParser.urlencoded({ extended: false }));

const port = 8080;

function AddText(fileName, contents, font, x, y) {
  Jimp.read(fileName)
    .then(function (image) {
      loadedImage = image;
      return Jimp.loadFont(font);
    })
    .then(function (font) {
      loadedImage.print(font, x, y, contents).write(fileName)

    })
    .catch(function (err) {
      console.error(err);
      console.log(contents)
      console.log("RETRYING");
      AddText(fileName, contents, font, x, y);
    });

};

app.get('/meshpack', function (req, res) {
  res.sendFile("meshsite.html", { root: __dirname });
});
app.get('/source', function (req, res) {

  var fileName = "SOURCE".concat(req.query["s"], ".png")
  res.sendFile(fileName, { root: __dirname });
});
app.get('/Insert', function (req, res) {

  const choice = []
  for (const key in req.query) {
    choice.push(req.query[key])
  }
  var templateName = "TEMPLATE.png";
  sourcec = sourcec + 1
  var fileName = "SOURCE".concat(sourcec, ".png")


  fs.copyFile(templateName, fileName, (err) => {
    if (err) throw err;
    console.log('SourceFile was copied to DestinationFile');
  });
  for (i = 0; i < Lib.length; i++) {
    if (i == 0) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 400, 235); };
    if (i == 1) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 390, 90); };
    if (i == 2) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 50); };
    if (i == 3) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 700, 90); };
    if (i == 4) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 390, 360); };
    if (i == 5) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 1800, 235); };//reg pack 700,235
    if (i == 6) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2100, 235); };//plus pack 1300,235
    if (i == 7) {
      if (choice[i].length > 41) {
        AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 700, 235);
        AddText(fileName, choice[i].slice(20, 40), Jimp.FONT_SANS_32_BLACK, 700, 285);
        AddText(fileName, choice[i].slice(40, choice[i].length), Jimp.FONT_SANS_32_BLACK, 700, 320);
      } else {
        if (choice[i].length > 21) {
          AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 700, 235);
          AddText(fileName, choice[i].slice(20, choice[i].length), Jimp.FONT_SANS_32_BLACK, 700, 285);
        } else {
          AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 700, 235);
        }
      };
    };
    if (i == 8) {
      if (choice[i].length > 41) {
        AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 1300, 235);
        AddText(fileName, choice[i].slice(20, 40), Jimp.FONT_SANS_32_BLACK, 1300, 285);
        AddText(fileName, choice[i].slice(40, choice[i].length), Jimp.FONT_SANS_32_BLACK, 1300, 320);
      } else {
        if (choice[i].length > 21) {
          AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 1300, 235);
          AddText(fileName, choice[i].slice(20, choice[i].length), Jimp.FONT_SANS_32_BLACK, 1300, 285);
        } else {
          AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 1300, 235);
        }
      };
    };





    if (i == 8) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 1300, 235); };//plus run 2100,235
    if (i == 10) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 150); };
    if (i == 11) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 150); };
    if (i == 12) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 235); };
    if (i == 13) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 235); };
    if (i == 14) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 320); };
    if (i == 15) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 320); };
    if (i == 16) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 405); };
    if (i == 17) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 405); };


  };
  doc.useServiceAccountAuth(creds, function (err) {
    if (err)
      console.log(err);
    doc.addRow(1, { SKU: choice[0], DATE_CREATED: choice[1], BRAND: choice[2], DESCRIPTION: choice[3], CATEGORY: choice[4], QTY_REG_PACKS: choice[5], QTY_PLUS_PACKS: choice[6], REGULAR_SIZE_RUN: choice[7], PLUS_SIZE_RUN: choice[8], FABRICATION: choice[9], PP_SAMPLE: choice[10], PP_SAMPLE_SIZE: choice[11], DESIGNER: choice[12], VENDOR: choice[13], SHIP_DATE: choice[14], NO_LATER_THAN: choice[15], SHIPPING_METHOD: choice[16], STATUS: choice[17] }, function (err) {
      if (err) {
        console.log(err);
      }
    });

  });



  res.send('<p> adding data to sheet and on <a  href="http://'.concat(IPV4, ':8080/source?s='.concat(sourcec, '">source image</a></p>')))

});
app.get('/InsertA', function (req, res) {
  const choice = []
  for (const key in req.query) {
    choice.push(req.query[key])
  }
  sourcec = sourcec + 1
  var templateName = "TEMPLATEA.png";
 
  var fileName = "SOURCE".concat(sourcec, ".png")
 
  fs.copyFile(templateName, fileName, (err) => {
    if (err) throw err;
    console.log('SourceFile was copied to DestinationFile');
  });
  for (i = 0; i < LibA.length; i++) {


    if (i == 0) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 400, 235); console.log(choice[i]); };
    if (i == 1) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 390, 90); console.log(choice[i]); };
    if (i == 2) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 50); console.log(choice[i]); };
    if (i == 3) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 700, 90); console.log(choice[i]); };
    if (i == 4) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 390, 360); console.log(choice[i]); };
    if (i == 5) {
      if (choice[i].length > 41) {
        AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 700, 235);
        AddText(fileName, choice[i].slice(20, 40), Jimp.FONT_SANS_32_BLACK, 700, 285);
        AddText(fileName, choice[i].slice(40, choice[i].length), Jimp.FONT_SANS_32_BLACK, 700, 320);
      } else {
        if (choice[i].length > 21) {
          AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 700, 235);
          AddText(fileName, choice[i].slice(20, choice[i].length), Jimp.FONT_SANS_32_BLACK, 700, 285);
        } else {
          AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 700, 235);
        }
      };
    };
    if (i == 6) {
      if (choice[i].length > 41) {
        AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 1400, 235);
        AddText(fileName, choice[i].slice(20, 40), Jimp.FONT_SANS_32_BLACK, 1400, 285);
        AddText(fileName, choice[i].slice(40, choice[i].length), Jimp.FONT_SANS_32_BLACK, 1400, 320);
      } else {
        if (choice[i].length > 21) {
          AddText(fileName, choice[i].slice(0, 20), Jimp.FONT_SANS_32_BLACK, 1400, 235);
          AddText(fileName, choice[i].slice(20, choice[i].length), Jimp.FONT_SANS_32_BLACK, 1400, 285);
        } else {
          AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 1400, 235);
        }
      };
    };
    if (i == 7) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2100, 235); };//reg pack 700,235
    if (i == 8) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 150); console.log(choice[i]); };
    if (i == 9) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 150); console.log(choice[i]); };
    if (i == 10) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 235); console.log(choice[i]); };
    if (i == 11) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 235); console.log(choice[i]); };
    if (i == 12) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 320); console.log(choice[i]); };
    if (i == 13) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 320); console.log(choice[i]); };
    if (i == 14) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2800, 405); console.log(choice[i]); };
    if (i == 15) { AddText(fileName, choice[i], Jimp.FONT_SANS_32_BLACK, 2400, 405); console.log(choice[i]); };
  };
  console.log("Ssss")
  doc.useServiceAccountAuth(creds, function (err) {
    if (err)
      console.log(err);
    doc.addRow(1, { SKU: choice[0], DATE_CREATED: choice[1], BRAND: choice[2], DESCRIPTION: choice[3], CATEGORY: choice[4], BPB: choice[5], BP: choice[6], BELT_ORDER: choice[7], PP_SAMPLE: choice[8], PP_SAMPLE_SIZE: choice[9], DESIGNER: choice[10], VENDOR: choice[11], SHIP_DATE: choice[12], NO_LATER_THAN: choice[13], SHIPPING_METHOD: choice[14], STATUS: choice[15] }, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  res.send('<p> adding data to sheet and on <a  href="http://'.concat(IPV4, ':8080/source?s='.concat(sourcec, '">source image</a></p>')))
});
app.get('/', function (req, res) {
  res.sendFile('site.html', { root: __dirname })

});
var upccount = -1
const mixedcases = [];
app.get('/AdminPanel', function (req, res) {
  //try { 
  const action = req.query["action"]
  const var1 = req.query["var1"]
  const var2 = req.query["var2"]
  const var3 = req.query["var3"]
  const var4 = req.query["var4"]
  console.log("1")

  if (action == "Panel") {
    res.sendFile('adminpanel.html', { root: __dirname })
  }
  if (action == "MixedCases") {
    var GS1Sheet = new GoogleSpreadsheet(var1);
    res.send(mixedcases)
  
    GS1Sheet.useServiceAccountAuth(creds, function (err) {
      var i = 0

      function gsadd() {

        console.log(i)
        console.log(mixedcases[i])
        var aGTIN = mixedcases[i].GTIN
        var aDESC = mixedcases[i].DESC
        var aSKU = mixedcases[i].SKU
        var aQuantity = mixedcases[i].Quantity
        var aChildGTINs = mixedcases[i].ChildGTINs
        GS1Sheet.addRow(1, { GTIN: aGTIN, PackagingLevel: "Mixed Case", Description: aDESC, SKU: aSKU, Quantity: aQuantity, ChildGTINs: aChildGTINs }, function () {

          i = i + 1
          if (i != mixedcases.length) {
            gsadd()
          }else{ mixedcases.splice(0,mixedcases.length)
          }

        });

      }
      gsadd()

      //const currtempvals = [["DESC"], ["GTIN"],  ["SKU"], ["Quantity"],["ChildGTINs"]]




    });
  }
  if (action == "DATA") {
    var insertsheet = new GoogleSpreadsheet(var1);
    const input = []
    var curr = "";
    for (i = 0; i < var2.length; i++) {
      char = var2.charAt(i)

      if (char == "|") {
        count = count + 1;

        input.push(curr);
        curr = "";
      } else {
        curr = "".concat(curr, char)  
      };
    };
    input.push(curr);
    insertsheet.useServiceAccountAuth(creds, function () {
      insertsheet.addRow(1, {DESCRIPTION: input[0],SKU: input[1],REGULAR_SIZE_RUN: input[2],PLUS_SIZE_RUN: input[3],BPB: input[4]}, function () {});
    });
    res.send("Inerting ".concat(" | ",input))
  }

  if (action == "TGS1") {
    console.log("2")
    res.send("Transfering Sheets");

    var OrdersSheet = new GoogleSpreadsheet(var1);
    var GS1Sheet = new GoogleSpreadsheet(var2);
    var gsrows = []
    var count = 0;

    var curr = "";
    const UPCS = [];
    console.log(var3)
    for (i = 0; i < var3.length; i++) {
      char = var3.charAt(i)

      if (char == " ") {
        count = count + 1;

        UPCS.push(curr);
        curr = "";
      } else {
        curr = "".concat(curr, char)
      };

    };

    UPCS.push(curr);
    console.log(UPCS)
    console.log("3 |".concat(UPCS.length))

    OrdersSheet.useServiceAccountAuth(creds, async function (err) {

      // Get all of the rows from the spreadsheet.
      OrdersSheet.getRows(1, async function (err, rows) {
        //console.log("len |".concat(Object.keys(rows).length));

        for (i = 0; i < Object.keys(rows).length; i++) {


          //tempdes = [[["DESCRIPTION"]= rows[i].description,["SKU"] = rows[i].SKU,["REGULAR_SIZE_RUN"] = rows[i].REGULAR_SIZE_RUN,["PLUS_SIZE_RUN"] = rows[i].PLUS_SIZE_RUN]]
          const tempvals = [["DESCRIPTION"], ["SKU"], ["REGULAR_SIZE_RUN"], ["PLUS_SIZE_RUN"], ["BPB"]]
          tempvals["DESCRIPTION"] = rows[i].description
          tempvals["SKU"] = rows[i].sku
          tempvals["REGULAR_SIZE_RUN"] = rows[i].regularsizerun
          tempvals["PLUS_SIZE_RUN"] = rows[i].plussizerun
          tempvals["BPB"] = rows[i].bpb
          console.log(tempvals)
          gsrows.push(tempvals)

        }
        GS1Sheet.useServiceAccountAuth(creds, function (err) {

          //rows[i].Description
          //rows[i].SKU
          //rows[i].PackagingLevel
          //gsrows[i].DESCRIPTION
          //gsrows[i].REGULAR_SIZE_RUN
          //gsrows[i].PLUS_SIZE_RUN
          //gsrows[i].SKU


          //adding mother
          // if (gsrows[i].REGULAR_SIZE_RUN == "2(S), 2(M), 2(L)") {

          // }
          // if (gsrows[i].REGULAR_SIZE_RUN == "1(4), 1(6), 1(8), 1(10), 1(12), 1(14)") {

          // }



          for (i = 0; i < gsrows.length; i++) {

            if (gsrows[i].REGULAR_SIZE_RUN == "2(S), 2(M), 2(L)") {
              const currUPCS = [];

              upccount = upccount + 1
              const DESCRIPTION = gsrows[i].DESCRIPTION
              const SKU = gsrows[i].SKU
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" Small"), SKU: SKU.concat("-S") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN:"'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" Medium"), SKU: SKU.concat("-M") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])


              const currdesc = gsrows[i].DESCRIPTION
              const currsku = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" Large"), SKU: SKU.concat("-L") }, function () {
                upccount = upccount + 1
                const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                currtempvals["DESC"] = currdesc.concat(" Regular Size")
                currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                currtempvals["SKU"] = currsku
                currtempvals["Quantity"] = "2~2~2"
                currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2])
                mixedcases.push(currtempvals)

                //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(" Regular Size"), SKU: currsku, Quantity: "2~2~2", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2]) }, function (err) { if (err) { console.log(err); } });
              });




            }
            if (gsrows[i].PLUS_SIZE_RUN == "2(XL), 2(2XL), 2(3XL)") {
              const currUPCS = [];
              upccount = upccount + 1
              const DESCRIPTION = gsrows[i].DESCRIPTION
              const SKU = gsrows[i].SKU
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" XL"), SKU: SKU.concat("-XL") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 2XL"), SKU: SKU.concat("-2XL") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])


              const currdesc = gsrows[i].DESCRIPTION
              const currsku = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 3XL"), SKU: SKU.concat("-3XL") }, function () {
                upccount = upccount + 1
                const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                currtempvals["DESC"] = currdesc.concat(" Plus Size")
                currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                currtempvals["SKU"] = currsku.concat("-X")
                currtempvals["Quantity"] = "2~2~2"
                currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2])
                mixedcases.push(currtempvals)

                //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(" Plus Size"), SKU: currsku.concat("-X"), Quantity: "2~2~2", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2]) }, function (err) { if (err) { console.log(err); } });
              });




            }
            if (gsrows[i].REGULAR_SIZE_RUN == "1(4), 1(6), 1(8), 1(10), 1(12), 1(14)") {
              const currUPCS = [];

              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              var DESCRIPTION = gsrows[i].DESCRIPTION
              var SKU = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 4"), SKU: gsrows[i].SKU.concat("-4") });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 6"), SKU: gsrows[i].SKU.concat("-6") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN:"'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 8"), SKU: gsrows[i].SKU.concat("-8") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 10"), SKU: gsrows[i].SKU.concat("-10") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 12"), SKU: gsrows[i].SKU.concat("-12") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              const currdesc = gsrows[i].DESCRIPTION
              const currsku = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 14"), SKU: gsrows[i].SKU.concat("-14") }, function () {
                upccount = upccount + 1
                const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                currtempvals["DESC"] = currdesc.concat(" Regular Size")
                currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                currtempvals["SKU"] = currsku
                currtempvals["Quantity"] = "1~1~1~1~1~1"
                currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4], "~", currUPCS[5])
                mixedcases.push(currtempvals)
                //currUPCS.push(UPCS[upccount])
                //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(" Regular Size"), SKU: currsku, Quantity: "1~1~1~1~1~1", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4], "~", currUPCS[5]) }, function (err) { if (err) { console.log(err); } });

              });


            }

            if (gsrows[i].PLUS_SIZE_RUN == "1(14), 2(16), 2(18), 1(20), 1(22)") {
              const currUPCS = [];
              
              const DESCRIPTION = gsrows[i].DESCRIPTION
              const SKU = gsrows[i].SKU
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" 14"), SKU: gsrows[i].SKU.concat("-14") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" 16"), SKU: gsrows[i].SKU.concat("-16") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" 18"), SKU: gsrows[i].SKU.concat("-18") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: DESCRIPTION.concat(" 20"), SKU: gsrows[i].SKU.concat("-20") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])

              const currdesc = gsrows[i].DESCRIPTION
              const currsku = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 22"), SKU: gsrows[i].SKU.concat("-22") }, function () {
                upccount = upccount + 1
                //currUPCS.push(UPCS[upccount])
                const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                currtempvals["DESC"] = currdesc.concat(" Plus Size")
                currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                currtempvals["SKU"] = currsku.concat("-X")
                currtempvals["Quantity"] = "1~2~2~1~1"
                currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4])
                mixedcases.push(currtempvals)
                //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(" Plus Size"), SKU: currsku.concat("-X"), Quantity: "1~2~2~1~1", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4]) }, function (err) { if (err) { console.log(err); } });
              });



            }
            if (gsrows[i].BPB.includes("per")) {
              console.log(gsrows[i].BPB)
              const currUPCS = [];
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
              currtempvals["DESC"] = gsrows[i].DESCRIPTION.concat("")
              currtempvals["GTIN"] = "'".concat(UPCS[upccount])
              currtempvals["SKU"] = gsrows[i].SKU.concat("")
              currtempvals["Quantity"] = ""
              currtempvals["ChildGTINs"] = ""
              mixedcases.push(currtempvals)
              //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(""), SKU: gsrows[i].SKU.concat("") }, function (err) { if (err) { console.log(err); } });
            }

            if (gsrows[i].PLUS_SIZE_RUN == "7, 8, 9, 10, 11") {
              const currUPCS = [];
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 7"), SKU: gsrows[i].SKU.concat("-7") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 8"), SKU: gsrows[i].SKU.concat("-8") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 9"), SKU: gsrows[i].SKU.concat("-9") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 10"), SKU: gsrows[i].SKU.concat("-10") }, function (err) { if (err) { console.log(err); } });
              upccount = upccount + 1
              currUPCS.push(UPCS[upccount])
              const currdesc = gsrows[i].DESCRIPTION
              const currsku = gsrows[i].SKU
              GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 11"), SKU: gsrows[i].SKU.concat("-11") }, function () {
                upccount = upccount + 1
                const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                currtempvals["DESC"] = currdesc.concat("")
                currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                currtempvals["SKU"] = currsku.concat("")
                currtempvals["Quantity"] = "1~1~1~1~1"
                currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4])
                mixedcases.push(currtempvals)
                //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(""), SKU: currsku, Quantity: "", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4]) }, function (err) { if (err) { console.log(err); } });
              });




            };
          };



        });

      });
    });








  };
  //}catch{}

});



app.listen(8080, () => console.log("Server started on http://".concat(IPV4, ":8080/")));
