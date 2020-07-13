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
var PastebinAPI = require('pastebin-js');
const csvdata = [];
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var pastebin = new PastebinAPI();
/* var pastebin = new PastebinAPI('af6cd4c1fab6df54b45af3aa4e57ced6');
pastebin = new PastebinAPI({
  'api_dev_key' : 'af6cd4c1fab6df54b45af3aa4e57ced6',
  'api_user_name' : 'brandonjeff',
  'api_user_password' : 'LANDB2020'
 }); */
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
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
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
const Data = []
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
          } else {
            mixedcases.splice(0, mixedcases.length)
          }

        });

      }
      gsadd()

      //const currtempvals = [["DESC"], ["GTIN"],  ["SKU"], ["Quantity"],["ChildGTINs"]]




    });
  }
  if (action == "PROD") {

    var inputsheet = new GoogleSpreadsheet(var1);
    var outputsheet = new GoogleSpreadsheet(var2);
    function apRow(Format) {

      GS1Sheet.addRow(1, { Format: Format }, function (err) { if (err) { apRow(Format) } });


    };
    const out = []
    inputsheet.useServiceAccountAuth(creds, function () {
      inputsheet.getRows(1, async function (err, rows) {
        //console.log("len |".concat(Object.keys(rows).length));

        for (i = 0; i < Object.keys(rows).length; i++) {


          const tempvals = [["UPC"], ["DESCRIPTION"], ["SKU"], ["Size"], ["Category"], ["QTY"]]
          tempvals["UPC"] = rows[i].upc
          tempvals["DESCRIPTION"] = rows[i].description
          tempvals["SKU"] = rows[i].sku
          tempvals["Size"] = rows[i].size
          tempvals["Category"] = rows[i].category
          tempvals["QTY"] = rows[i].qty
          //console.log(tempvals)
          out.push(tempvals)


        };
      });
    });
    outputsheet.useServiceAccountAuth(creds, function () {
      for (i = 0; i < out.length; i++) {
        //S-33-JADE-C;"en";"D";"52315";"Shop///Women's///Dresses";"21.00";"7";"6";"0";"exim/backup/images/F0593-IVORY3-1__148_.jpg#{[en]:;}";"Jade Short Sleeve Dress";"<p>Solid tunic/dress with elastic short sleeve wrists. Elastic neckline with a lace shoulder upper. Fully lined with a Pleated look.</p>";"https://landbapparel.com/s-33-jade.html";"https://landbw.co/images/thumbnails/400/600/detailed/32/F0593-IVORY3-1__148_.jpg";"https://landbw.co/images/detailed/32/F0593-IVORY3-1__148_.jpg";"landbapparel.com";"B"
        //Product code;Language;Status;Product id;Category;Price;Quantity;Min quantity;Max quantity;Detailed image;Product name;Description;Product URL;Image URL;Detailed image URL;Store;Inventory tracking
        apRow(
          "".concat(out[i]["SKU"], ";", '"en"', ";", '"H"', ";", '"N/A"', ";",
            '"', out[i]["Category"]

          ))
      };
    });

  };
  if (action == "out") {

    const csvWriter = createCsvWriter({
      path: 'out.csv',
      header: [
        {id: 'Action', title: 'Action'},
        {id: 'GS1CompanyPrefix', title: 'GS1CompanyPrefix'},
        {id: 'GTIN', title: 'GTIN'},
        {id: 'PackagingLevel', title: 'PackagingLevel'},
        {id: 'Description', title: 'Description'},
        {id: 'Desc1Language', title: 'Desc1Language'},
        {id: 'SKU', title: 'SKU'},
        {id: 'BrandName', title: 'BrandName'},
        {id: 'Brand1Language', title: 'Brand1Language'},
        {id: 'Status', title: 'Status'},
        {id: 'IsVariable', title: 'IsVariable'},
        {id: 'IsPurchasable', title: 'IsPurchasable'},
        {id: 'Certified', title: 'Certified'},
        {id: 'Height', title: 'Height'},
        {id: 'Width', title: 'Width'},
        {id: 'Depth', title: 'Depth'},
        {id: 'DimensionMeasure', title: 'DimensionMeasure'},
        {id: 'GrossWeight', title: 'GrossWeight'},
        {id: 'NetWeight', title: 'NetWeight'},
        {id: 'WeightMeasure', title: 'WeightMeasure'},
        {id: 'Comments', title: 'Comments'},
        {id: 'ChildGTINs', title: 'ChildGTINs'},
        {id: 'Quantity', title: 'Quantity'},
        {id: 'SubBrandName', title: 'SubBrandName'},
        {id: 'ProductDescriptionShort', title: 'ProductDescriptionShort'},
        {id: 'LabelDescription', title: 'LabelDescription'},
        {id: 'NetContent1Count', title: 'NetContent1Count'},
        {id: 'NetContent1UnitOfMeasure', title: 'NetContent1UnitOfMeasure'},
        {id: 'NetContent2Count', title: 'NetContent2Count'},
        {id: 'NetContent2UnitOfMeasure', title: 'NetContent2UnitOfMeasure'},
        {id: 'NetContent3Count', title: 'NetContent3Count'},
        {id: 'NetContent3UnitOfMeasure', title: 'NetContent3UnitOfMeasure'},
        {id: 'BrandName2', title: 'BrandName2'},
        {id: 'Brand2Language', title: 'Brand2Language'},
        {id: 'Description2', title: 'Description2'},
        {id: 'Desc2Language', title: 'Desc2Language'},
        {id: 'GlobalProductClassification', title: 'GlobalProductClassification'},
        {id: 'ImageURL', title: 'ImageURL'},
        {id: 'TargetMarket', title: 'TargetMarket'},
        
        //, Certified: "", Height: "", Width: "", Depth: "", DimensionMeasure:"", GrossWeight:"", NetWeight: "", WeightMeasure: "", Comments: ""
      ]
    });
    for (i = 0; i < csvdata.length; i++) {
      Object.assign(csvdata[i], {Action: "Create",GS1CompanyPrefix: "0193930", Desc1Language: "en", BrandName: "L&B Apparel", Brand1Language: "en", Status: "PreMarket",IsVariable: "N", IsPurchasable: "Y"})
    }
    console.log(csvdata)
    csvWriter
    .writeRecords(csvdata).then(function(){console.log("Sending File");res.download("out.csv")})
    
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
    function repaprow(DESC, SKU, RSR, PSR, BPB) {
      insertsheet.addRow(1, { DESCRIPTION: DESC, SKU: SKU, REGULAR_SIZE_RUN: RSR, PLUS_SIZE_RUN: PSR, BPB: BPB }, function () { if (err) { repaprow(DESC, SKU, RSR, PSR, BPB); } });
    }
    insertsheet.useServiceAccountAuth(creds, function () {
      repaprow(input[0], input[1], input[2], input[3], input[4])
      //insertsheet.addRow(1, {DESCRIPTION: input[0],SKU: input[1],REGULAR_SIZE_RUN: input[2],PLUS_SIZE_RUN: input[3],BPB: input[4]}, function () {});
    });
    res.send("Inerting ".concat(" | ", input))
  }
  
  if (action == "TGS1") {
    console.log("2")  
    res.send("Done Inserting");

    var OrdersSheet = new GoogleSpreadsheet(var1);
    var GS1Sheet = new GoogleSpreadsheet(var2);
    var gsrows = []
    var count = 0;

    var curr = "";
    const UPCS = [];
    

    pastebin.getPaste(var3).then(function (data) {
      
      console.log("Test")
      for (i = 0; i < data.length; i++) {
        char = data.charAt(i)

        if (char == " ") {
          count = count + 1;

          UPCS.push(curr);
          curr = "";
        } else {
          curr = "".concat(curr, char)
        };

      };
      csvdata.splice(0,csvdata.length) 
      UPCS.push(curr);
      console.log(UPCS)
      console.log("3 |".concat(UPCS.length))
      var debugcount = 0
      OrdersSheet.useServiceAccountAuth(creds, async function (err) {
        function gr() {

        };
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
            //console.log(tempvals)
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


            // function apRow(last, GTIN, PL, DESC, SKU, currdesc, currgt, currsku, currqua, currcgt) {
            //   console.log("".concat(last, GTIN, PL, DESC, SKU))
            //   if (last) {
            //     GS1Sheet.addRow(1, { GTIN: GTIN, PackagingLevel: PL, Description: DESC, SKU: SKU }, function (err) {
            //       if (err) { apRow(true, GTIN, PL, DESC, SKU, currdesc, currgt, currsku, currqua, currcgt) } else {
            //         upccount = upccount + 1
            //         const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
            //         currtempvals["DESC"] = currdesc
            //         currtempvals["GTIN"] = "'".concat(UPCS[upccount])
            //         currtempvals["SKU"] = currsku
            //         currtempvals["Quantity"] = currqua
            //         currtempvals["ChildGTINs"] = currcgt
            //         mixedcases.push(currtempvals)
            //         debugcount = debugcount + 1
            //         console.log("".concat("DEBUG COUNT | ", debugcount))
            //       }

            //     });
            //   } else {

            //     GS1Sheet.addRow(1, { GTIN: GTIN, PackagingLevel: "Each", Description: DESC, SKU: SKU }, function (err) { if (err) { apRow(false, GTIN, "Each", DESC, SKU) } });
            //   };
            // };
            fs.copyFile("in.csv", "out.csv", (err) => {
              if (err) throw err;
              console.log('SourceFile was copied to DestinationFile');
            });
            function addIntoData(currd){
              csvdata.push(currd )
            }
            for (i = 0; i < gsrows.length; i++) {
              
              if (gsrows[i].REGULAR_SIZE_RUN == "2(S), 2(M), 2(L)") {
                
                const currUPCS = [];
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" Small"), SKU: SKU.concat("-S")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" Medium"), SKU: SKU.concat("-M")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" Large"), SKU: SKU.concat("-L")})
                
                
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Mixed Case", Description: DESCRIPTION.concat(" Regular Size"), SKU: SKU.concat(""), ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2]),Quantity: "2~2~2"  })
              };
             
              if (gsrows[i].PLUS_SIZE_RUN == "2(XL), 2(2XL), 2(3XL)") {
                const currUPCS = [];
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" XL"), SKU: SKU.concat("-XL")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 2XL"), SKU: SKU.concat("-2XL")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 3XL"), SKU: SKU.concat("-3XL")})
                
                
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Mixed Case", Description: DESCRIPTION.concat(" Plus Size"), SKU: SKU.concat("-X"), ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2]),Quantity: "2~2~2"  })
                


              }
              if (gsrows[i].REGULAR_SIZE_RUN == "1(4), 1(6), 1(8), 1(10), 1(12), 1(14)") {
                const currUPCS = [];
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 4"), SKU: SKU.concat("-4")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 6"), SKU: SKU.concat("-6")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 8"), SKU: SKU.concat("-8")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 10"), SKU: SKU.concat("-10")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 12"), SKU: SKU.concat("-12")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 14"), SKU: SKU.concat("-14")})
                
                
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Mixed Case", Description: DESCRIPTION.concat(" Regular Size"), SKU: SKU.concat("-X"), ChildGTINs: "".concat("".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4], "~", currUPCS[5])),Quantity: "1~1~1~1~1~1"  })
                


              }

              if (gsrows[i].PLUS_SIZE_RUN == "1(14), 2(16), 2(18), 1(20), 1(22)") {
                const currUPCS = [];
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 14"), SKU: SKU.concat("-14")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 16"), SKU: SKU.concat("-16")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 18"), SKU: SKU.concat("-18")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 20"), SKU: SKU.concat("-20")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 22"), SKU: SKU.concat("-22")})
              
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Mixed Case", Description: DESCRIPTION.concat(" Plus Size"), SKU: SKU.concat("-X"), ChildGTINs: "".concat("".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4])),Quantity: "1~2~2~1~1"  })
              

              }
              if (gsrows[i].BPB.includes("per")) {
              
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "each", Description: DESCRIPTION.concat(""), SKU: SKU.concat("")})
                
              }

              if (gsrows[i].PLUS_SIZE_RUN == "7, 8, 9, 10, 11") {
                const currUPCS = [];
                const DESCRIPTION = gsrows[i].DESCRIPTION
                const SKU = gsrows[i].SKU
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 7"), SKU: SKU.concat("-7")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 8"), SKU: SKU.concat("-8")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 9"), SKU: SKU.concat("-9")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 10"), SKU: SKU.concat("-10")})
                upccount = upccount + 1
                currUPCS.push(UPCS[upccount])
                
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Each", Description: DESCRIPTION.concat(" 11"), SKU: SKU.concat("-11")})
              
                upccount = upccount + 1
                csvdata.push({GTIN: "'".concat(UPCS[upccount]),PackagingLevel: "Mixed Case", Description: DESCRIPTION.concat(""), SKU: SKU.concat(""), ChildGTINs: "".concat("".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4])),Quantity: "1~1~1~1~1"  })
                // const currUPCS = [];
                // upccount = upccount + 1
                // currUPCS.push(UPCS[upccount])
                // apRow(false, "'".concat(UPCS[upccount]), "Each", DESCRIPTION.concat(" 7"), SKU.concat("-7"))
                // //GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 7"), SKU: gsrows[i].SKU.concat("-7") }, function (err) { if (err) { console.log(err); } });
                // upccount = upccount + 1
                // currUPCS.push(UPCS[upccount])
                // apRow(false, "'".concat(UPCS[upccount]), "Each", DESCRIPTION.concat(" 8"), SKU.concat("-8"))
                // //GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 8"), SKU: gsrows[i].SKU.concat("-8") }, function (err) { if (err) { console.log(err); } });
                // upccount = upccount + 1
                // currUPCS.push(UPCS[upccount])
                // apRow(false, "'".concat(UPCS[upccount]), "Each", DESCRIPTION.concat(" 9"), SKU.concat("-9"))
                // //GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 9"), SKU: gsrows[i].SKU.concat("-9") }, function (err) { if (err) { console.log(err); } });
                // upccount = upccount + 1
                // currUPCS.push(UPCS[upccount])
                // apRow(false, "'".concat(UPCS[upccount]), "Each", DESCRIPTION.concat(" 10"), SKU.concat("-10"))
                // //GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 10"), SKU: gsrows[i].SKU.concat("-10") }, function (err) { if (err) { console.log(err); } });
                // upccount = upccount + 1
                // currUPCS.push(UPCS[upccount])
                // const currdesc = gsrows[i].DESCRIPTION
                // const currsku = gsrows[i].SKU
                // apRow(true, "'".concat(UPCS[upccount]), "Each", DESCRIPTION.concat(" 11"), SKU.concat("-11"), currdesc.concat(""), "'".concat(UPCS[upccount]), currsku.concat(""), "1~1~1~1~1", "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4]))
                // // GS1Sheet.addRow(1, { GTIN: "'".concat(UPCS[upccount]), PackagingLevel: "Each", Description: gsrows[i].DESCRIPTION.concat(" 11"), SKU: gsrows[i].SKU.concat("-11") }, function () {
                // //   upccount = upccount + 1
                // //   const currtempvals = [["DESC"], ["GTIN"], ["SKU"], ["Quantity"], ["ChildGTINs"]]
                // //   currtempvals["DESC"] = currdesc.concat("")
                // //   currtempvals["GTIN"] = "'".concat(UPCS[upccount])
                // //   currtempvals["SKU"] = currsku.concat("")
                // //   currtempvals["Quantity"] = "1~1~1~1~1"
                // //   currtempvals["ChildGTINs"] = "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4])
                // //   mixedcases.push(currtempvals)
                // //   //GS1Sheet.addRow(1, { GTIN: UPCS[upccount], PackagingLevel: "Mixed Case", Description: currdesc.concat(""), SKU: currsku, Quantity: "", ChildGTINs: "".concat(currUPCS[0], "~", currUPCS[1], "~", currUPCS[2], "~", currUPCS[3], "~", currUPCS[4]) }, function (err) { if (err) { console.log(err); } });
                // // });




              };

            };



          });
        });
      });
    }).fail(function(err){console.log(err)})








  };
  //}catch{}

});




app.listen(8080, () => console.log("Server started on http://".concat(IPV4, ":80800/")));
