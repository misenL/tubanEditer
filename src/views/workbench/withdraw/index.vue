<template>
  <div class="pay">
    <div class="pay-title">我的支付宝</div>
    <div class="add-user">
      <i class="el-icon-circle-plus-outline mr-10px font-20px" />添加账户
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
.pay{
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.1);
  box-sizing: border-box;
  padding: 0 25px 0 22px;
  .pay-title{
    width: 100%;
    font-size: 14px;
    color: #5e5d5d;
    box-sizing: border-box;
    height: 51px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  .add-user{
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #0083e9;
    cursor: pointer;
  }
}
</style>
