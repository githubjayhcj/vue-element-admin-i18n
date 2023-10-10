<template>
    <div>

        <div style="display: flex; justify-content: center;">
            <div style="width: 50%;">
                <el-card class="box-card">
                    <span>socket 客户端远程连接测试</span>
                    <div v-for="o in 1" :key="o" class="text item">
                        可接入的 socket 服务端地址为：47.99.139.38:9099
                    </div>
                    <div style="margin-top: 15px;">技术描述：以非阻塞的 nio-socket 技术，实现了单线程对多客户端的多路复用。</div>
                </el-card>
            </div>
        </div>

        <el-divider></el-divider>

        <div style="display: flex; justify-content: center;">
            <div style="width: 50%;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>socket远程客户端：</span>
                        <el-button @click="getCount" style="float: right; padding: 3px 0" type="text">刷新</el-button>
                    </div>
                    <div v-for="o in 1" :key="o" class="text item">
                        {{ '当前接入数量 ' + count }}
                    </div>
                    <div v-for="o in channelAddress" :key="o" class="text item">
                        {{ '客户端连接地址： ' + o }}
                    </div>
                </el-card>
            </div>
        </div>

        <el-divider></el-divider>

        <div style="display: flex; justify-content: center;">
            <div style="width: 50%;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>向远程客户端发送消息：</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">刷新</el-button> -->
                    </div>
                    <div v-for="o in 1" :key="o" class="text item">
                        <div style="display: flex;justify-content: space-between;">
                            <span>发送给所有客户端：</span>
                            <el-input v-model="msgAll" placeholder="请输入内容"></el-input>
                            <el-button v-on:click="sentAll" style="float: right; padding: 3px 0" type="text">发送</el-button>
                        </div>
                        <div style="display: flex;justify-content: space-between; margin-top: 15px;">
                            <span>发送给第一个客户端：</span>
                            <el-input v-model="msgOne" placeholder="请输入内容"></el-input>
                            <el-button v-on:click="sentFirstOne" style="float: right; padding: 3px 0" type="text">发送</el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>

        <el-divider></el-divider>

        <div style="display: flex; justify-content: center;">
            <div style="width: 50%;">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>接收远程客户端消息:</span>
                        <el-button v-on:click="getBackMsg" style="float: right; padding: 3px 0" type="text">刷新</el-button>
                    </div>
                    <div v-for="o in backMags" :key="o" class="text item">
                        <span>客户端发送到服务端的消息:{{ o }}</span>
                    </div>
                </el-card>
            </div>
        </div>




    </div>
</template>

<script>
import axios from 'axios'

import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数 

export default {
    directives: { permission },
    name: "menu1",
    data() {
        return {
            count: 0,
            channelAddress: [],
            address: "asdawdwadawdwad",
            msgAll: "",
            msgOne: "",
            backMags:[]
        }
    },
    methods: {
        checkPermission,
        //
        getCount() {
            console.log("getCount....")
            // axios.get("/api/getClientSocket").then(res => {
            axios.get("http://47.99.139.38:8084/getClientSocket").then(res => {
                //
                console.log("getCount res:" + JSON.stringify(res))

                if (res.data.code == 1) {
                    this.channelAddress = res.data.data
                    this.count = this.channelAddress.length

                } else {
                    console.error("请求发送错误，请检查服务器。")
                }

            }).catch(err => {
                console.log("getCount error:" + err)
            })
        },
        sentAll() {
            console.log("sent all...." + this.msgAll)
            // axios.post("/api/sentAllChannel", { msg: this.msgAll }).then(res => {
            axios.post("http://47.99.139.38:8084/sentAllChannel", { msg: this.msgAll }).then(res => {
                //
                console.log("sentAll res:" + JSON.stringify(res))

                if (res.data.code == 1) {
                    // ok
                    this.$message({
                        message: '发送成功!',
                        type: 'success'
                    });

                } else {
                    console.error("请求发送错误，请检查服务器。")
                }

            }).catch(err => {
                console.log("getCount error:" + err)
            })
        },
        sentFirstOne() {
            console.log("sent sentFirstOne...." + this.msgOne)
            // axios.post("/api/sentFirstOneChannel", { msg: this.msgOne }).then(res => {
            axios.post("http://47.99.139.38:8084/sentFirstOneChannel", { msg: this.msgOne }).then(res => {
                //
                console.log("sentFirstOne res:" + JSON.stringify(res))

                if (res.data.code == 1) {
                    // ok
                    this.$message({
                        message: '发送成功!',
                        type: 'success'
                    });

                } else {
                    console.error("请求发送错误，请检查服务器。")
                }

            }).catch(err => {
                console.log("getCount error:" + err)
            })
        },
        getBackMsg(){
            console.log("sent sentFirstOne...." + this.msgOne)
            // axios.get("/api/getBackMsg", { msg: this.msgOne }).then(res => {
            axios.get("http://47.99.139.38:8084/getBackMsg", { msg: this.msgOne }).then(res => {
                //
                console.log("getBackMsg res:" + JSON.stringify(res))

                if (res.data.code == 1) {
                    // ok
                    this.backMags = res.data.data
                } else {
                    console.error("请求发送错误，请检查服务器。")
                }

            }).catch(err => {
                console.log("getCount error:" + err)
            })
        }
    }
}

</script>

<style lang="scss" scoped></style>