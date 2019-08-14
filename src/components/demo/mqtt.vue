<template>
  <div>
    <remote-script src="https://cdn.staticfile.org/jquery/1.11.1/jquery.min.js"></remote-script>
    <remote-script src="https://cdn.staticfile.org/sockjs-client/1.3.0/sockjs.min.js"></remote-script>
    <!-- <remote-script src="mqttws31.js"></remote-script> -->

    <canvas id="cnvs"></canvas>
  </div>
</template>

<script>
import "../../common/importJs.js";
import Paho from "../../assets/js/mqttws31.js";

export default {
  data() {
    return {
      pointer_url: require("../../assets/pencil.cur")
    };
  },
  methods: {
    drawit() {
      var send;
      var draw;
      send = draw = function() {};

      var lines = [];

      var canvas = document.getElementById("cnvs");

      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        var img = new Image();
        img.onload = function() {
          ctx.drawImage(img, 0, 0);
        };
        // img.src = "malume_logo.png";

        draw = function(p) {
          ctx.beginPath();
          ctx.moveTo(p.x1, p.y1);
          ctx.lineTo(p.x2, p.y2);
          ctx.stroke();
          // ctx.drawImage(img, 0, 0);
        };

        var do_resize = function() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          // ctx.font = "bold 20px sans-serif";
          // ctx.fillStyle = "#444";
          // ctx.fillText("Draw wings on the bunny!", 260, 100);
          // ctx.font = "normal 16px sans-serif";
          // ctx.fillStyle = "#888";
          // ctx.fillText("(For more fun open a second browser)", 255, 130);

          ctx.drawImage(img, 230, 160);

          ctx.strokeStyle = "#fa0";
          ctx.lineWidth = "10";
          ctx.lineCap = "round";

          $.map(lines, function(p) {
            draw(p);
          });
        };

        $(window).resize(do_resize);
        $(do_resize);

        var pos = $("#cnvs").position();
        var prev = null;
        $("#cnvs").mousedown(function(evt) {
          evt.preventDefault();
          evt.stopPropagation();
          $("#cnvs").bind("mousemove", function(e) {
            var curr = { x: e.pageX - pos.left, y: e.pageY - pos.top };
            if (!prev) {
              prev = curr;
              return;
            }
            if (
              Math.sqrt(
                Math.pow(prev.x - curr.x, 2) + Math.pow(prev.y - curr.y, 2)
              ) > 8
            ) {
              var p = { x1: prev.x, y1: prev.y, x2: curr.x, y2: curr.y };
              lines.push(p);
              draw(p);
              send(JSON.stringify(p));
              prev = curr;
            }
          });
        });
        $("html").mouseup(function() {
          prev = null;
          $("#cnvs").unbind("mousemove");
        });
      } else {
        document.write(
          "Sorry - this demo requires a browser with canvas tag support."
        );
      }

      // MQTT boilerplate

      var debug = function() {
        if (window.console && console.log && console.log.apply) {
          console.log.apply(console, arguments);
        }
      };

      var wsbroker = "192.168.1.45"; //mqtt websocket enabled broker
      var wsport = 11133; // port for above

      var client = new Paho.MQTT.Client(
        wsbroker,
        wsport,
        "/ws",
        "myclientid_" + parseInt(Math.random() * 100, 10)
      );

      client.onConnectionLost = function(responseObject) {
        debug("CONNECTION LOST - " + responseObject.errorMessage);
        // client = new Paho.MQTT.Client(
        //   wsbroker,
        //   wsport,
        //   "/ws",
        //   "myclientid_" + parseInt(Math.random() * 100, 10)
        // );
        client.connect({
          timeout: 3,
          onSuccess: function() {
            debug("CONNECTION SUCCESS");
            client.subscribe("/topic/bunny", { qos: 1 });
          },
          onFailure: function(message) {
            debug("CONNECTION FAILURE - " + message.errorMessage);
          }
        });
      };

      client.onMessageArrived = function(message) {
        debug(
          "RECEIVE ON " +
            message.destinationName +
            " PAYLOAD " +
            message.payloadString
        );

        var p = JSON.parse(message.payloadString);
        lines.push(p);
        draw(p, true);
      };

      var options = {
        timeout: 3,
        onSuccess: function() {
          debug("CONNECTION SUCCESS");
          client.subscribe("/topic/bunny", { qos: 1 });
        },
        onFailure: function(message) {
          debug("CONNECTION FAILURE - " + message.errorMessage);
        }
      };

      if (location.protocol == "https:") {
        options.useSSL = true;
      }

      debug("CONNECT TO " + wsbroker + ":" + wsport);
      client.connect(options);

      $("#first input").focus(function() {
        if (!has_had_focus) {
          has_had_focus = true;
          $(this).val("");
        }
      });

      send = function(data) {
        var message = new Paho.MQTT.Message(data);
        message.destinationName = "/topic/bunny";
        debug("SEND ON " + message.destinationName + " PAYLOAD " + data);
        client.send(message);
      };
    }
  },
  mounted() {
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.src = 'https://cdn.staticfile.org/jquery/1.11.1/jquery.min.js';
    // document.body.appendChild(s);
    let self = this;
    isjQueryLoadend();
    function isjQueryLoadend() {
      //判断JQ是否加载完成没有的话 继续判断
      if (typeof $ != "undefined" && document.body) {
        //jquery
        self.drawit();
      } else {
        setTimeout(isjQueryLoadend, 500);
      }
    }
    // setTimeout(() => {
    //   this.drawit();
    // }, 1000);
  }
};
</script>
<style scoped>
#cnvs {
  border: none;
  -moz-border-radius: 4px;
  /* cursor: url(), crosshair; */
  /* position: absolute; */
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
/* #cnvs:active {
  cursor: url(pencil.cur), crosshair;
} */
/* body {
  overflow: hidden;
} */
</style>