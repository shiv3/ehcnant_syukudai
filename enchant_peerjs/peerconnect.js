
    var peer = new Peer({
      key: '6v1i6ak2nyqoajor'
    }); // PeerJSのサイトで取得したAPI keyを設定


    peer.on('open', function(id) {
      document.getElementById("mypeerid").innerHTML = id;
      oneid = id;
    });

    peer.on('connection', function(conn) {
      conn.on('data', function(data) {
        if(data.type=="connect"){
          connect_receive(data.id);
        }
      });
    });
    function connect_receive(id){
      conn = peer.connect(id);
      conn.on('open', function() {
        conn.send({"type":"receive","id":id});
      });
    };

    function connect() {
      anid = document.getElementById("peerid").value;
      conn = peer.connect(anid);
      conn.on('open', function() {
        conn.send({"type":"connect","id":oneid});
      });
    }

    function send() {
      ms = $("#send")[0].value;
      conn.send(ms);
    }

    $('input#send').keydown(function(e) {
      console.log(e)
      if (e.which == 13) {
        ms = $("#send")[0].value;
        conn.send(ms);
        console.log("a")
      }
    });
