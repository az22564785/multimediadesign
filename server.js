// var http = require('http');
// http.createServer(function(req, res){
//     res.write("Hello World!");
//     res.end();
// }).listen(8080)

var express = require("express");
server = express();


var bodyParser = require("body-parser");
var formidable = require("formidable");
var fs = require("fs");
var sizeOf = require('image-size');

var Datastore = require('nedb');
var Users = new Datastore({ filename: __dirname + '/data/users.db', autoload: true });
var OurPortfolio = new Datastore({ filename: __dirname + '/data/ourportfolio.db', autoload: true });


server.use(express.static('Exercise1'));//web root
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.text({ type: 'text/html' }));
server.use(bodyParser.json({ type: 'application/json' }));

server.set("view engine", "ejs");
server.set("views", __dirname + "/views");

server.use(express.static(__dirname + "/views"));

server.get("/addimg", function (req, res) {
  Users.find({}, function (err, result) {
    if (err == null) {
      var i = 0;
      result.forEach(function (item) {
        Users.update({ id: item.id }, { $set: { img: "img_avator" + (i % 6 + 1) } });
        i++;
      })
      res.end("OK");
    }
  })

});

server.get("/student", function (req, res) {
  Users.find({}, function (err, result) {
    if (err == null) {
      res.render("student", { student: result });
    }
  });
});
//全部人
server.get("/portfolio", function (req, res) {
  OurPortfolio.find({}, function (err, result) {
    if (err == null) {
      res.render("portfolio", { portfolio: result });
    }
  });
});
//郁翔ALL
server.get("/YuXiangALL", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangALL", { YuXiangALL: result });
    }
  });
});
//紫晏ALL
server.get("/ZiYanALL", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanALL", { ZiYanALL: result });
    }
  });
});
//鈺晉ALL
server.get("/YuJinALL", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉" }, function (err, result) {
    if (err == null) {
      res.render("YuJinALL", { YuJinALL: result });
    }
  });
});
//俊洋ALL
server.get("/JunYangAll", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋" }, function (err, result) {
    if (err == null) {
      res.render("JunYangAll", { JunYangAll: result });
    }
  });
});
//攝影
server.get("/photographyAll", function (req, res) {
  OurPortfolio.find({ List: "攝影" }, function (err, result) {
    if (err == null) {
      res.render("photographyAll", { photographyAll: result });
    }
  });
});
//繪圖
server.get("/DrawAll", function (req, res) {
  OurPortfolio.find({ List: "繪圖" }, function (err, result) {
    if (err == null) {
      res.render("DrawAll", { DrawAll: result });
    }
  });
});
//動畫
server.get("/AnimationAll", function (req, res) {
  OurPortfolio.find({ List: "動畫" }, function (err, result) {
    if (err == null) {
      res.render("AnimationAll", { AnimationAll: result });
    }
  });
});
//音效
server.get("/MusicAll", function (req, res) {
  OurPortfolio.find({ List: "音效" }, function (err, result) {
    if (err == null) {
      res.render("MusicAll", { MusicAll: result });
    }
  });
});
//建模
server.get("/ModelingAll", function (req, res) {
  OurPortfolio.find({ List: "建模" }, function (err, result) {
    if (err == null) {
      res.render("ModelingAll", { ModelingAll: result });
    }
  });
});

//郁翔
server.get("/YuXiangphotography", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔", List: "攝影" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangphotography", { YuXiangphotography: result });
    }
  });
});

server.get("/YuXiangDraw", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔", List: "繪圖" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangDraw", { YuXiangDraw: result });
    }
  });
});

server.get("/YuXiangAnimation", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔", List: "動畫" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangAnimation", { YuXiangAnimation: result });
    }
  });
});

server.get("/YuXiangMusic", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔", List: "音效" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangMusic", { YuXiangMusic: result });
    }
  });
});

server.get("/YuXiangModeling", function (req, res) {
  OurPortfolio.find({ id: "陳郁翔", List: "建模" }, function (err, result) {
    if (err == null) {
      res.render("YuXiangModeling", { YuXiangModeling: result });
    }
  });
});
//紫晏  
server.get("/ZiYanphotography", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏", List: "攝影" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanphotography", { ZiYanphotography: result });
    }
  });
});

server.get("/ZiYanDraw", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏", List: "繪圖" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanDraw", { ZiYanDraw: result });
    }
  });
});

server.get("/ZiYanAnimation", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏", List: "動畫" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanAnimation", { ZiYanAnimation: result });
    }
  });
});

server.get("/ZiYanMusic", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏", List: "音效" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanMusic", { ZiYanMusic: result });
    }
  });
});

server.get("/ZiYanModeling", function (req, res) {
  OurPortfolio.find({ id: "黃紫晏", List: "建模" }, function (err, result) {
    if (err == null) {
      res.render("ZiYanModeling", { ZiYanModeling: result });
    }
  });
});
//鈺晉 
server.get("/YuJinphotography", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉", List: "攝影" }, function (err, result) {
    if (err == null) {
      res.render("YuJinphotography", { YuJinphotography: result });
    }
  });
});

server.get("/YuJinDraw", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉", List: "繪圖" }, function (err, result) {
    if (err == null) {
      res.render("YuJinDraw", { YuJinDraw: result });
    }
  });
});

server.get("/YuJinAnimation", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉", List: "動畫" }, function (err, result) {
    if (err == null) {
      res.render("YuJinAnimation", { YuJinAnimation: result });
    }
  });
});

server.get("/YuJinMusic", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉", List: "音效" }, function (err, result) {
    if (err == null) {
      res.render("YuJinMusic", { YuJinMusic: result });
    }
  });
});

server.get("/YuJinModeling", function (req, res) {
  OurPortfolio.find({ id: "魏鈺晉", List: "建模" }, function (err, result) {
    if (err == null) {
      res.render("YuJinModeling", { YuJinModeling: result });
    }
  });
});
//俊洋
server.get("/JunYangphotography", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋", List: "攝影" }, function (err, result) {
    if (err == null) {
      res.render("JunYangphotography", { JunYangphotography: result });
    }
  });
});

server.get("/JunYangDraw", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋", List: "繪圖" }, function (err, result) {
    if (err == null) {
      res.render("JunYangDraw", { JunYangDraw: result });
    }
  });
});

server.get("/JunYangAnimation", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋", List: "動畫" }, function (err, result) {
    if (err == null) {
      res.render("JunYangAnimation", { JunYangAnimation: result });
    }
  });

}); server.get("/JunYangMusic", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋", List: "音效" }, function (err, result) {
    if (err == null) {
      res.render("JunYangMusic", { JunYangMusic: result });
    }
  });
});

server.get("/JunYangModeling", function (req, res) {
  OurPortfolio.find({ id: "陳俊洋", List: "建模" }, function (err, result) {
    if (err == null) {
      res.render("JunYangModeling", { JunYangModeling: result });
    }
  });
});


server.post("/delete", function (req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function (err, fields) {
    if (fields == null) {
      res.render("error", { error: "No Data Input!", next: "javascript:history.back()" });
    } else {   //password:gotFields.pw
      var gotFields = fields;
      OurPortfolio.findOne({ id: gotFields.uid, List: gotFields.List, DesignTitle: gotFields.DesignTitle }, function (err1, result1) {
        if (err1 == null && result1 != null) {
          Users.findOne({ id: gotFields.uid, password: gotFields.pw }, function (err, result) {
            if (err == null && result != null) {
              OurPortfolio.remove({ id: gotFields.uid, List: gotFields.List, DesignTitle: gotFields.DesignTitle }, function (err1, result1) {
                if(err1==null && result1==1){
                  res.render("success", { success: "Delete Data OK!", next: "javascript:location.href='../HomePage/home.html'" });
                }else{

                }
              });
             
            }
          })
        }
      })
    }
})
})





//     if (err == null && result != null) {
//         OurPortfolio.remove({ id: gotFields.uid, List: gotFields.List, DesignTitle: gotFields.DesignTitle, DesignUrl: gotFields.DesignUrl, poster: gotFields.poster });
//         //res.render("success", { success: "OK", next: "javascript:location.href='../HomePage/home.html'" });
//         sizeOf(posterPath, function (err, dim) {
//           if (err) {
//             res.render("error", { error: "Cannot read uploaded image file.", next: "javascript:history.back()" });
//           } else {
//             if (dim.width != 1920 || dim.height != 1080) {
//               res.render("error", { error: "Image size requires 1920x1080.", next: "javascript:history.back()" });
//               fs.unlinkSync(posterPath);
//             } else {
//               //record to database, nedb, mongodb         "javascript:location.href='../HomePage/home.html'"
//               res.render("success", { success: "OK", next: "javascript:history.back()" });
//             }
//           }
//         })
//       } else {
//         res.render("error", { error: "Password is Wrong!", next: "javascript:history.back()" });

//         //res.render("error");
//       }

//     })

//   //check image size
// })
// }
//   })



server.post("/pass", function (req, res) {
  var form = formidable.IncomingForm();
  form.maxFileSize = 70000 * 1024;
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("File size too large!");
      res.render("error", { error: err.message, next: "javascript:history.back()" })
    } else {
      var gotFields = fields;
      var fileExt = files.poster.name.split(".")[1];
      gotFields.poster = gotFields.uid + "_" + gotFields.List + "_" + gotFields.DesignTitle + "." + fileExt;
      var posterPath = "Exercise1/uploads/" + gotFields.poster;
      fs.renameSync(files.poster.path, posterPath);
      Users.findOne({ id: gotFields.uid, password: gotFields.pw }, function (err, result) {
        if (err == null && result != null) {
                    //res.render("success", { success: "OK", next: "javascript:location.href='../HomePage/home.html'" });
          sizeOf(posterPath, function (err, dim) {
            if (err) {
              res.render("error", { error: "Cannot read uploaded image file.", next: "javascript:history.back()" });
            } else {
              if (dim.width != 1920 || dim.height != 1080) {
                res.render("error", { error: "Image size requires 1920x1080.", next: "javascript:history.back()" });
                fs.unlinkSync(posterPath);
              } else {
                OurPortfolio.insert({ id: gotFields.uid, List: gotFields.List, DesignTitle: gotFields.DesignTitle, Experience:gotFields.Experience, DesignConcept:gotFields.DesignConcept, DesignUrl: gotFields.DesignUrl, poster: gotFields.poster });

                //record to database, nedb, mongodb         "javascript:location.href='../HomePage/home.html'"
                res.render("success", { success: "OK", next: "javascript:history.back()" });
              }
            }
          })
        } else {
          res.render("error", { error: "Password is Wrong!", next: "javascript:history.back()" });

          //res.render("error");
        }

      })

      //check image size

    }
  })


});
//修改密碼
server.post("/Modify", function (req, res) {
  var form = formidable.IncomingForm();
  form.parse(req, function (err, fields) {
    var gotFields = fields;
    Users.findOne({ id: gotFields.uid }, function (err, result) {
      if (err == null && result != null) {
        Users.update({ id: gotFields.uid, password: gotFields.pw });
      } else {
        res.render("error", { error: "Password is Wrong!", next: "javascript:history.back()" });
      }
    })
  });
});

server.post("/getstudent", function (req, res) {
  Users.find({}, function (err, result) {
    if (err == null) {
      res.send({ student: result });
    }
  });
});

server.get("/gameform", function (req, res) {
  Users.find({}, function (err, result) {
    if (err == null) {
      res.render("gameform", { student: result })
    }
  })
});




server.post("/add", function (req, res) {
  var form = formidable.IncomingForm();
  form.maxFileSize = 1920 * 1080;
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("File size too large!");
      res.render("error", { error: err.message, next: "javascript:history.back()" })
    } else {
      var gotFields = fields;
      var fileExt = files.poster.name.split(".")[1];
      gotFields.poster = gotFields.id + "." + fileExt;
      var posterPath = "Exercise1/uploads/" + gotFields.poster;
      fs.renameSync(files.poster.path, posterPath);
      //check image size
      sizeOf(posterPath, function (err, dim) {
        if (err) {
          res.render("error", { error: "Cannot read uploaded image file.", next: "javascript:history.back()" });
        } else {
          if (dim.width != 1920 || dim.height != 1080) {
            res.render("error", { error: "Image size requires 800x400.", next: "javascript:history.back()" });
            fs.unlinkSync(posterPath);
          } else {
            //record to database, nedb, mongodb
            res.render("success", { success: "OK", next: "javascript:history.back()" });
          }
        }
      })
    }
  })
});

var AdmZip = require('adm-zip');
const { userInfo } = require("os");

server.post("/addgamefile", function (req, res) {
  var form = formidable.IncomingForm();
  form.maxFileSize = 4000 * 1024;
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("File size too large!");
      res.render("error", { error: err.message, next: "javascript:history.back()" })
    } else {
      var gamepath = "Exercise1/game/" + fields.id;
      var ext = files.gamezip.name.split(".")[1];
      try {
        if (ext == "zip") {
          var zip = new AdmZip(files.gamezip.path);
          zip.extractAllTo(gamepath, true);
          res.render("success", { error: "Success uploaded." });
        }
      } catch (err) {
        res.render("error", { error: "cannot unzip uploaded file" })
      }
      fs.unlinkSync(files.gamezip.path);

    }
  })
});

server.get("/", function (req, res) {
  res.send("Hello World!");
});

server.get("/md2020", function (req, res) {
  res.send("Hello MD2020!");
});

server.get("*", function (req, res) {
  res.send("Page not found", 404);
})

server.listen(8080);
console.log("Server running on port: 8080")
