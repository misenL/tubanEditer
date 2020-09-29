<template>
  <div class="income">
    <div class="title">收益说明</div>

    <div class="benefits">
      <div class="benefits-title1">
        <span />
        <span>操作流程</span>
      </div>
      <div class="benefit-process">
        <div class="process-title">
          <span>1</span>
          <span>在线认证</span>
        </div>
        <div class="process-title">
          <span>2</span>
          <span>上传模板</span>
        </div>
        <div class="process-title">
          <span>3</span>
          <span>图帮主审核模板</span>
        </div>
        <div class="process-title">
          <span>4</span>
          <span>模板上架并获取收益</span>
        </div>
      </div>

      <div class="benefits-title1 mt-40px">
        <span />
        <span>关于收益</span>
      </div>
      <div class="benefits-title5">收益说明 ：被支付成功的模板金额的80%</div>
      <div class="benefits-title6">计算公式：出售次数 × (品类单价 × 80%）= 实际收益</div>
      <div class="benefits-title6">举例:</div>
      <div class="benefits-title6">张三店铺总共上架了500个模板，其中横版名片280个、手机海报160个、工作证60个。</div>
      <div class="benefits-title6">其中，横版名片被购买320次，手机海报被购买208次，工作证被购买125次。</div>
      <div class="benefits-title6">320 × (9×80%) + 208 × (10×80%) + 125 × (7×80%)</div>
      <div class="benefits-title6">= 2304元 + 1664元 + 700元</div>
      <div class="benefits-title6">= 4668元</div>
      <div class="benefits-title1 mt-40px">
        <span />
        <span>关于提现</span>
      </div>
      <div class="benefits-title6 mt-5px">提现方式：支付宝</div>
      <div class="benefits-title6">最低金额：收益≥10元时，可随时申请提现</div>
      <div class="benefits-title6">到账时间：图帮主收到提现申请后的3个工作日内处理(节假日顺延)</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index', // 收益说明
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.income{
  background: white;
  box-sizing: border-box;
  padding: 20px 25px 56px 22px;
  .title{
    width: 100%;
    height: 51px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #5e5d5d;
  }
  .benefits{
    margin-top: 35px;
    box-sizing: border-box;
    padding-left: 23px;
    .benefits-title1{
      display: flex;
      align-items: center;
      span:nth-child(1){
        display: inline-block;
        width: 3px;
        height: 18px;
        background: #0083e9;
      }
      span:nth-child(2){
        margin-left: 8px;
        font-size: 16px;
        color: #141414;
        line-height: 1;
        font-weight: 700;
      }
    }
    .benefit-process{
      margin-top: 12px;
      display: flex;
      align-items: center;
      .process-title{
        margin-right: 8px;
        display: flex;
        span:nth-child(1){
          width: 34px;
          height: 35px;
          background: #adadad;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          color: #fff;
          font-weight: 700;
          font-family: Arial;
          line-height: 1;
          font-style: oblique;
        }
        span:nth-child(2){
          width: 152px;
          height: 35px;
          background: #e5e5e5;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 9px;
          font-size: 14px;
          color: #555;
          line-height: 1;
        }
      }
    }
    .benefits-title5{
      margin-top: 7px;
      font-size: 14px;
      color: #ff7800;
      line-height: 23px;
    }
    .benefits-title6{
      font-size: 14px;
      color: #555;
      line-height: 23px;
    }
  }
}
</style>
