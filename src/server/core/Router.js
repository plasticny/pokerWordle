const path = require("path");
const Logger = require("./Logger");

function Router(app) {
    const WebROOT = getWebRoot();
    const FontawesomeRoot = getFontawesomeRoot();

    this.getSrcRoot = getSrcRoot;
    this.getServerRoot = getServerRoot;

    init();
    return;

    function init() {
        setCommonRouting();
        setPageRouting();
        setJsRouting();
        setCssRouting();
        setAssetRouting();
        setPluginRouting();
        return;
    }


    /////////////////////////////////////////////////
    /*************** public function ***************/

    // get src root
    function getSrcRoot() {
        return __dirname.substring(0, __dirname.lastIndexOf('\\server\\core'));
    }

    function getWebRoot() {
        return __dirname.substring(0, __dirname.lastIndexOf('\\server\\core'))+"/web";
    }

    function getServerRoot() {
        return getSrcRoot() + "\\server";
    }

    function getFontawesomeRoot() {
        return __dirname.substring(0, __dirname.lastIndexOf('\\src\\server\\core'))+"/node_modules/@fortawesome/fontawesome-free";
    }


    //////////////////////////////////////////////////
    /*************** private function ***************/

    function setCommonRouting() {
        addRoute("/css/common.css", WebROOT+"/css/common/common.css");
        addRoute("/script/common/Random.js", WebROOT+"/script/common/Random.js");
    }

    function setPageRouting() {
        addRoute("/", WebROOT+"/page/index.html");
        addRoute("/index.html", WebROOT+"/page/index.html");
    }

    function setJsRouting() {
        addRoute("/script/index.js", WebROOT+"/script/index.js");
    }

    function setCssRouting() {        
        addRoute("/css/index.css", WebROOT+"/css/index/index.css");
        addRoute("/css/index.css.map", WebROOT+"/css/index/index.css.map");
    }

    function setAssetRouting() {
        addRoute("/asset/*", (req) => { return WebROOT+req.path });
    }

    function setPluginRouting() {
        addRoute("/script/jquery.js", WebROOT+"/plugin/jquery-3.6.0.min.js");
        // fontawesome
        addRoute("/css/fontawesome.css", FontawesomeRoot+"/css/all.css");
        addRoute("/webfonts/*", (req) => { return FontawesomeRoot+req.path; });
    }

    function addRoute(routePath, filePath) {
        app.get(routePath, (req, res) => { 
            Logger.logReq(req);

            if(typeof filePath === "function") {
                res.sendFile(filePath(req));
            } else {
                res.sendFile(filePath); 
            }
        });
    }
}
module.exports = Router;