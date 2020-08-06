
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
var path = require("path")

function Seperate(contents, seperater, INCLUDE_SEPERATER) {
    const List = [];
    var curr = ""
    for (i = 0; i < contents.length; i++) {
        char = contents.charAt(i)

        if (char == seperater) {
            if (INCLUDE_SEPERATER) {
                curr = curr.concat(seperater)
            }
            List.push(curr)
            curr = ""

        } else {
            curr = curr.concat(char)
            if (i == contents.length - 1) {
                List.push(curr)
            }
        }
    }

    return List
};

function AddDate(currdate, add) {
    const monthdays = [0, 31, 29, 31, 30, 31, 30, 31, 31,30,31,30,31]
    const output = ["","",""]
    
    var day = 0 //parseInt(currdate.charAt(0).concat(currdate.charAt(2)))
    var month = 0 //parseInt(currdate.charAt(4).concat(currdate.charAt(5)))
    var year = 0//parseInt(currdate.charAt(7).concat(currdate.charAt(8),currdate.charAt(9),currdate.charAt(10)))
    if (currdate.charAt(0) == 0) {
        day = Number(currdate.charAt(1))
        console.log(Number(currdate.charAt(1)))
    }else{
        Number(currdate.charAt(0).concat(currdate.charAt(1)))
    }
    if (currdate.charAt(3) == 0) {
        day = Number(currdate.charAt(3))
    }else{
        Number(currdate.charAt(3).concat(currdate.charAt(4)))
    }
    year = Number("".concat(currdate.charAt(6), currdate.charAt(7),currdate.charAt(8),currdate.charAt(9)))

   if (day + add > monthdays[month]){
        var correctday = (day + add) - monthdays[month]
        if (month < 10){
            output[0] = "0".concat(toString(month +1))
            
        }else{
            output[0] =  toString(month +1)
            
        }

        if (correctday < 10){
            output[1] = "0".concat(toString(correctday)) 
        }else{
            output[1] = toString(correctday)
        }
        if (month + 1 > 12){
            output[0] = "01"
            output[2] = toString(year + 1)
        }
   }else{
    output[2] = toString(year)
    if (month < 10){
        output[0] = "0".concat(toString(month))
        
    }else{
        output[0] =  toString(month)
        
    }

    if (day < 10) {
        output[1] = "0".concat(toString(day + add))
    }else{
        output[1] = toString(day + add)
    }


    
   }
   
   return "".concat(output[0],"/",output[1],"/",output[2]  )
    
}

const gsrows = []
var OrdersSheet = new GoogleSpreadsheet("1N7NdRf0mt_tqVpqrDg5hXsTmvmboikhgbjUPdyTtvaA");
OrdersSheet.useServiceAccountAuth(creds, async function (err) {

    // Get all of the rows from the spreadsheet.
    OrdersSheet.getRows(1, async function (err, rows) {
        console.log("DOOO")
        //console.log("len |".concat(Object.keys(rows).length));
        const sizerunlib = [["2(S), 2(M), 2(L)"] , ["2(XL), 2(2XL), 2(3XL)" ], ["0-3(1),3-6(2),6-9(2),9-12(1)"] ,["1(4), 1(6), 1(8), 1(10), 1(12), 1(14)"],["1(14), 2(16), 2(18), 1(20), 1(22)"]]
        sizerunlib["2(S), 2(M), 2(L)"] = "6,6,"
        sizerunlib["2(XL), 2(2XL), 2(3XL)" ] = "6,6,"
        sizerunlib["2(XL), 2(2XL), 2(3XL)" ] = "6,6,"
        sizerunlib["0-3(1),3-6(2),6-9(2),9-12(1)"] = "6,6,"
        sizerunlib["1(4), 1(6), 1(8), 1(10), 1(12), 1(14)"] = "6,6,"
        sizerunlib["1(14), 2(16), 2(18), 1(20), 1(22)"] = "7,7,"

        for (i = 0; i < Object.keys(rows).length; i++) {


            //tempdes = [[["DESCRIPTION"]= rows[i].description,["SKU"] = rows[i].SKU,["REGULAR_SIZE_RUN"] = rows[i].REGULAR_SIZE_RUN,["PLUS_SIZE_RUN"] = rows[i].PLUS_SIZE_RUN]]
            const tempvals = [["DESCRIPTION"], ["SKU"], ["Category"]]
            tempvals["DESCRIPTION"] = rows[i].description
            tempvals["SKU"] = rows[i].sku
            //	FACE MASKS/MEDICAL SUPPLIES 
            var ETA = "" 
            ETA = rows[i].nolaterthan 
            
            
                if (rows[i].regularsizerun != "" ){
                    if (rows[i].category == "Headwear"){
                        
                        console.log(rows[i].description.concat("",",",rows[i].sku, ",","3,3,","Shop///Accessories///Headwear",",Pre-Order(PO)",",H"))
                    }else{
                        if (rows[i].category == "Mask"){
                            console.log(rows[i].description.concat("",",",rows[i].sku, ",","3,3,","FACE MASKS/MEDICAL SUPPLIES",",Pre-Order(PO)",",H"))
                        }else{
                        
                            console.log(rows[i].description.concat(" Regular Size",",",rows[i].sku, ",",sizerunlib[rows[i].regularsizerun],"Shop///Women's///", rows[i].category,",Pre-Order(PO)",",H"))
                        }
                    }
                }
                if (rows[i].plussizerun != "" ){
                    if (rows[i].category == "Headwear"){
                        console.log(rows[i].description.concat("",",",rows[i].sku, ",","3,3,","Shop///Accessories///Headwear",",Pre-Order(PO)",",H"))
                    
                    }else{
                        console.log(rows[i].description.concat(" Plus Size",",",rows[i].sku,"-X", ",",sizerunlib[rows[i].plussizerun], "Shop///Women's///", rows[i].category,",Pre-Order(PO)",",H"))
                    }
                }
            
            //rows[i].REGULAR_SIZE_RUN
            // console.log(rows[i].description.concat(" Regular Size",",",rows[i].sku, ",", "6", ",", "6", ",", "Shop///Women's///Top"))
            // console.log(rows[i].description.concat(" Plus Size",",",rows[i].sku.concat("-X"), ",", "6", ",", "6", ",", "Shop///Women's///Top"))
        }
        // for (i = 0; i < Object.keys(rows).length; i++) {


        //     //tempdes = [[["DESCRIPTION"]= rows[i].description,["SKU"] = rows[i].SKU,["REGULAR_SIZE_RUN"] = rows[i].REGULAR_SIZE_RUN,["PLUS_SIZE_RUN"] = rows[i].PLUS_SIZE_RUN]]
        //     const tempvals = [["DESCRIPTION"], ["SKU"], ["Category"]]
        //     tempvals["DESCRIPTION"] = rows[i].description
        //     tempvals["SKU"] = rows[i].sku

        //     //console.log(tempvals)
        //     if (rows[i].category == "Shop///Women's///Jeans") {
        //         console.log(rows[i].description.concat(" Regular Size",",",rows[i].sku, ",", "6", ",", "6", ",", rows[i].category))

        //         console.log(rows[i].description.concat(" Plus Size",",",rows[i].sku.concat("-X"), ",", "7", ",", "7", ",", rows[i].category))
        //     } else {
        //         console.log(rows[i].description.concat(" Regular Size",",",rows[i].sku, ",", rows[i].minq, ",", rows[i].qs, ",", rows[i].category))

        //         console.log(rows[i].description.concat(" Plus Size",",",rows[i].sku.concat("-X"), ",", rows[i].minq, ",", rows[i].qs, ","  , rows[i].category))

        //         gsrows.push(tempvals)


        //     }
        // }
    })
})