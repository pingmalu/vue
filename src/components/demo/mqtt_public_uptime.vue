<template>
  <div>
    <remote-script src="https://unpkg.com/mqtt@3.0.0/dist/mqtt.min.js"></remote-script>
    <table>
      <thead>
        <tr>
          <th style="text-align: left">Name</th>
          <th>Time</th>
          <th>Msg</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="uptime in uptimelist" v-bind:key="uptime.name">
          <td>{{ uptime.name }}</td>
          <td v-html="uptime.time"></td>
          <td>{{ uptime.msg }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uptimelist: []
    };
  },
  methods: {
    time_to_color(time) {
      let tmptime = time;
      time = time.replace("-", "/"); //替换字符，变成标准格式
      time = new Date(Date.parse(time));
      var now = new Date();
      now.setMinutes(now.getMinutes() - 2);
      if (time < now) {
        // 指定的日期比现在的日期要小
        // console.log("超时");
        return '<span style="color:#ff4940;">' + tmptime + "</span>";
      } else {
        return tmptime;
      }
    },
    // 去重加入数组
    add_list(topic, payload) {
      let tag = true;
      this.uptimelist.forEach((value, i) => {
        if (value.name == topic) {
          this.uptimelist[i].time = payload.toString().split(" | ")[0];
          this.uptimelist[i].msg = payload.toString().split(" | ")[1];
          tag = false;
        }
      });
      console.log(payload.toString());
      if (tag)
        this.uptimelist.push({
          name: topic,
          time: this.time_to_color(payload.toString().split(" | ")[0]),
          msg: payload.toString().split(" | ")[1]
        });
    },
    init() {
      let fatherdata = this;
      var client = mqtt.connect("wss://test.mosquitto.org:8081"); // you add a ws:// url here
      client.subscribe("malu/#");

      client.on("message", function(topic, payload) {
        // fatherdata.uptimelist.push({ name: topic, msg: payload });
        fatherdata.add_list(topic, payload);
        // console.log(uptimelist)
        // uptimelist.aa = payload;
        console.log([topic, payload].join(": "));
        // console.log(this.uptimelist)
      });
    }
  },
  mounted() {
    let self = this;
    ismqttLoadend();
    function ismqttLoadend() {
      //判断mqtt是否加载完成没有的话 继续判断
      if (typeof mqtt != "undefined" && document.body) {
        self.init();
      } else {
        setTimeout(ismqttLoadend, 100);
      }
    }
  }
};
</script>
<style scoped>
table {
  border-spacing: 0px;
  border-right: 1px solid #4d4d4d;
  border-bottom: 1px solid #4d4d4d;
  font-size: 12px;
}
th {
  color: #fff;
  background-color: #1e1e1e;
  border-left: 1px solid #4d4d4d;
  border-top: 1px solid #4d4d4d;
  font-size: 12px;
  padding: 3px;
  vertical-align: top;
}
td {
  min-width: 24px;
  background-color: #2c2c2c;
  border-left: 1px solid #4d4d4d;
  border-top: 1px solid #4d4d4d;
  padding: 5px;
  vertical-align: top;
  text-align: left;
}
</style>