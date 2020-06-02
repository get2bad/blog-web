<template>
    <div class="not_permit">
        <b>
            <center>状态码：488</center>
            <span>对不起，您没有对应的权限！操作失败！</span>
        </b>
    </div>
</template>

<script>
export default {
    data () {

    }
}
</script>

<style lang="less">
.not_permit{
    height: 100%;
    background-color: #000;
    color: #ffffff;
    position: relative;
    b{
        font-size: 36px;
        display: block;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        font-family: 'KaiTi';
        background-color: #c0c0c0;
        padding: 20px 50px;
        border-radius: 10px;
        center{
            margin-bottom: 10px;
        }
    }
}
</style>
