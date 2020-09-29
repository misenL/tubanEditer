<template>
  <div class="fabric__editor">
    <div class="fabric__top">
      <div class="top__center">
        <div class="top__tips"><p>Ctrl + 鼠标滚轮缩放</p></div>
      </div>
      <div class="top__center">
        <div class="top__operation">
          <p v-loading.fullscreen.lock="fullscreenLoading" @click="handleRecord(-1)"><img src="../../assets/icon/cxiao.png"><span>撤销</span></p>
          <p @click="handleRecord(1)"><img src="../../assets/icon/cxiao.png" style="transform:rotateY(180deg)"><span>恢复</span></p>
        </div>
        <div class="top__size">
          <p><span>页宽： <el-input v-model="wcanInput" type="number" size="mini" @input="handleCanvasSize" /> {{ scaleValue }}</span></p>
          <p><span>页高： <el-input v-model="hcanInput" type="number" size="mini" @input="handleCanvasSize" /> {{ scaleValue }}</span></p>
        </div>
        <div class="top__size">
          <p><span>出血： <el-input v-model="bleeInput" type="number" size="mini" @input="handleCanvasBlee" /> {{ scaleValue }}</span></p>
          <p>
            <span>单位：
              <el-select v-model="scaleValue" style="flex:1" @change="changeScale">
                <el-option label="像素" value="px" />
                <el-option label="毫米" value="mm" />
              </el-select>
            </span>
          </p>
          <p style="width: 10px"><span /></p>
        </div>
      </div>
      <div class="top__right">工具</div>
    </div>
    <div class="fabric__bottom">
      <!-- 左 -->
      <div class="fabric__left">
        <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in fabricLeftList" :key="index" :label="item.name" :name="item.api" :type="item.type">
            <div class="left__content">
              <!--文字-->
              <div v-if="item.api==='text'" class="tab__content">
                <div v-show="!contentShow" class="tab__classify">
                  <el-button type="primary" @click="handelAddText">添加文字</el-button>
                  <div v-for="(item7, index7) in categoryList" :key="index7" class="classify_item mt-20px" @click="initData('text',{category_id: item7.id}), contentShow = true">
                    <img src="../../assets/icon/file.png" alt="">
                    <div class="text-center font-14px">{{ item7.title ? item7.title : '' }}</div>
                  </div>
                </div>
                <div v-show="contentShow" class="tab__list">
                  <div class="tab__return" @click="contentShow = false"><i class="el-icon-arrow-left mr-5px" />返回</div>
                  <div v-for="(item8, index8) in leftListData" :key="index8" class="tab_item">
                    <img :src="item8.url" @click="handleSome(item8)">
                  </div>
                </div>
              </div>

              <!-- <li v-if="item.api==='product'">
                <img v-for="(item1, index1) in leftListData" :key="index1" :src="item1.thumbnail" alt="" @click="handleTemplate(item1)">
              </li> -->
              <!--模板-->
              <div v-if="item.api==='product'" class="tab__content">
                <div v-show="!contentShow" class="tab__classify">
                  <div v-for="(item1, index1) in categoryList" :key="index1" class="classify_item" @click="initData('product',{category_id: item1.id}), contentShow = true">
                    <img src="../../assets/icon/file.png" alt="">
                    <div class="text-center font-14px">{{ item1.title ? item1.title : '' }}</div>
                  </div>
                </div>
                <div v-show="contentShow" class="tab__list">
                  <div class="tab__return" @click="contentShow = false"><i class="el-icon-arrow-left mr-5px" />返回</div>
                  <div v-for="(item2, index2) in leftListData" :key="index2" class="tab_item">
                    <img :src="item2.thumbnail" @click="handleUploadImg(item2)">
                  </div>
                </div>
              </div>

              <!--形状-->
              <div v-if="item.api==='shape'" class="tab__content">
                <div v-show="!contentShow" class="tab__classify">
                  <div v-for="(item1, index1) in categoryList" :key="index1" class="classify_item" @click="initData('shape',{category_id: item1.id}), contentShow = true">
                    <img src="../../assets/icon/file.png" alt="">
                    <div class="text-center font-14px">{{ item1.title ? item1.title : '' }}</div>
                  </div>
                </div>
                <div v-show="contentShow" class="tab__list">
                  <div class="tab__return" @click="contentShow = false"><i class="el-icon-arrow-left mr-5px" />返回</div>
                  <div v-for="(item2, index2) in leftListData" :key="index2" class="tab_item">
                    <img :src="item2.thumbnail" @click="handleUploadImg(item2)">
                  </div>
                </div>
              </div>
              <!--素材-->
              <div v-if="item.api==='material'" class="tab__content">
                <div v-show="!contentShow" class="tab__classify">
                  <div v-for="(item3, index3) in categoryList" :key="index3" class="classify_item" @click="initData('material',{category_id: item3.id}), contentShow = true">
                    <img src="../../assets/icon/file.png" alt="">
                    <div class="text-center font-14px">{{ item3.title ? item3.title : '' }}</div>
                  </div>
                </div>
                <div v-show="contentShow" class="tab__list">
                  <div class="tab__return" @click="contentShow = false">返回</div>
                  <div v-for="(item5, index5) in leftListData" :key="index5" class="tab_item">
                    <img :src="item5.url" alt="" @click="handleUploadImg(item5)">
                  </div>
                </div>
              </div>

              <!--背景-->
              <div v-if="item.api==='background'" class="tab__content">
                <div v-show="!contentShow" class="tab__classify">
                  <div v-for="(item4, index4) in categoryList" :key="index4" class="classify_item" @click="initData('background',{category_id: item4.id}), contentShow = true">
                    <img src="../../assets/icon/file.png" alt="">
                    <div class="text-center font-14px">{{ item4.title ? item4.title : '' }}</div>
                  </div>
                </div>
                <div v-show="contentShow" class="tab__list">
                  <div class="tab__return" @click="contentShow = false">返回</div>
                  <div v-for="(item6, index6) in leftListData" :key="index6" class="tab_item">
                    <img :src="item6.url" alt="" @click="handleBg(item6)">
                  </div>
                </div>
              </div>

              <!--上传图片-->
              <div v-if="item.api==='file'" class="upload__content">
                <el-upload action="/api/UserFileUpload" :show-file-list="false" :on-success="onSuccess" :data="{type: 1, user_id: $store.state.user.userInfo.id}">
                  <el-button type="primary">快速上传</el-button>
                </el-upload>
                <div class="upload__list">
                  <div v-for="(item4, index4) in leftListData" :key="index4" style="position: relative" class="upload__item" @mouseenter="handleMouseenter(item4)" @mouseleave="handleMouseleave(item4)">
                    <img :src="item4.url" alt="" @click="handleUploadImg(item4)">
                    <div :ref="'upload_' + item4.id" class="delete" style="display: none">
                      <i class="el-icon-delete font-20px pointer" @click.stop="handleDelete(item4)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 中 -->
      <div class="fabric__center">
        <div class="fabric__canvas">
          <canvas id="canvas" width="400" height="650" :style="{padding:canvasPadding+'px'}" />
        </div>
        <!-- 新增页面and页面预览 -->
        <div class="page__preview">
          <li v-for="(item, index) in pageList" :key="index" :class="index==canvasChooseIndex?'showBorder':''" @click="clickPreview(index)">
            <div class="preview__div">
              <img class="canvas__preview" :src="item.url" alt="">
            </div>
            <img class="icon" style="top:20px" src="../../assets/icon/canvasAdd.png" alt="新增一个画布" title="新增一个画布" @click.stop="clickPreviewAdd(item.ind)">
            <img class="icon" style="top:55px" src="../../assets/icon/canvasDelete.png" alt="删除这个画布" title="删除这个画布" @click.stop="clickPreviewDelete(index)">
          </li>
        </div>
      </div>
      <!-- 右 -->
      <div class="fabric__right">
        <div>
          <div class="elSize">
            <li><span>宽： <el-input v-model="wInput" type="number" size="mini" @input="handleSize" /> px</span></li>
            <li><span>高： <el-input v-model="hInput" type="number" size="mini" @input="handleSize" /> px</span></li>
          </div>
          <li><span class="tool__name">透明度</span><img src="../../assets/icon/tmdu.png"><div class="right__tool"><el-slider v-model="opacityValue" @input="handleOpacity" /></div></li>
          <li><span class="tool__name">颜色</span><el-color-picker v-model="bgColor" show-alpha size="small" @change="handleBgColor" /></li>
          <li style="align-items:flex-start"><span class="tool__name">阴影</span><img src="../../assets/icon/yying.png">
            <div class="right__tool">
              <p><span style="width: 5vw">颜色-透明度</span><el-color-picker v-model="shadowColor" show-alpha size="mini" @change="handleShadow" /></p>
              <p><span>水平</span><el-slider v-model="shadowX" @input="handleShadow" /></p>
              <p><span>垂直</span><el-slider v-model="shadowY" @input="handleShadow" /></p>
              <p><span>模糊</span><el-slider v-model="shadowZ" @input="handleShadow" /></p>
            </div>
          </li>
          <li><span class="tool__name">翻转</span><img src="../../assets/icon/fzhuang.png"><div class="right__tool"><el-button plain size="mini" @click="handleFlip('scaleX')">水平</el-button><el-button plain size="mini" @click="handleFlip('scaleY')">垂直</el-button></div></li>
          <li><span class="tool__name">旋转</span><img src="../../assets/icon/xzhuan.png"><div class="right__tool"><el-input v-model="angleValue" type="number" size="mini" @input="handleRotate" /></div></li>
          <li><span class="tool__name">圆角</span><img src="../../assets/icon/yjiao.png"><div class="right__tool"><el-slider v-model="radiusValue" :max="elSlider" @input="handleRadius" /></div></li>
          <li><span class="tool__name">层级</span><el-button plain size="mini" @click="handleMoveTo('bringForward')">上移一层</el-button><el-button plain size="mini" @click="handleMoveTo('sendBackwards')">下移一层</el-button></li>
          <li><span class="tool__name">删除</span><img src="../../assets/icon/delete.png" style="cursor: pointer" @click="handelDelete"></li>
        </div>
        <div v-if="nowType==='textbox'" class="text__tool">
          <p>文字样式</p>
          <li><span class="Ttool__name">字体大小</span><el-input v-model="textSize" class="size__input" type="number" size="mini" @input="handleTextSize" /> px</li>
          <li><span class="Ttool__name">字体样式</span>
            <el-select v-model="fontFamily" placeholder="请选择" size="mini" @change="handleTextStyle">
              <el-option
                v-for="item in fontFamilyArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </li>
          <li class="Ttool__label">
            <img src="../../assets/icon/B.png" @click="handleFontBN('bold')">
            <img src="../../assets/icon/N.png" @click="handleFontBN('normal')">
            <img src="../../assets/icon/normal.png" @click="handleFontStyle('normal')">
            <img src="../../assets/icon/italic.png" @click="handleFontStyle('italic')">
            <img src="../../assets/icon/L.png" @click="handleFontAlign('left')">
            <img src="../../assets/icon/C.png" @click="handleFontAlign('center')">
            <img src="../../assets/icon/R.png" @click="handleFontAlign('right')">
          </li>
          <li><span class="Ttool__name">行高</span><el-input v-model="lineHeight" :step="0.1" class="size__input" type="number" size="mini" @input="handleFontLine" /></li>
        </div>
      </div>
    </div>
    <div class="img__down">
      <el-button plain type="success" size="small" @click="uploadCanvas()">保存云端</el-button>
      <el-button plain size="small" @click="downCanvas()">保存本地</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
export default {
  name: 'Index',
  data() {
    return {
      canvasName: '',
      activeName: 'text',
      wcanInput: 400,
      hcanInput: 650,
      bleeInput: 0,
      scaleValue: 'px',
      scaleInput: 1, // 单位比例
      canvasPadding: 0,
      elSlider: 50,
      fullscreenLoading: false,
      pageList: [
        { url: '', ind: 0, canvasData: '' }
      ], // 多页面编辑canvas
      canvasChooseIndex: 0,
      canvas: null,
      nowBg: null,
      nowEl: null,
      nowType: null,
      opacityValue: 100,
      radiusValue: 0,
      bgColor: 'rgba(205, 88, 255, 1)',
      shadowColor: 'rgba(205, 88, 255, 1)',
      shadowX: 0,
      shadowY: 0,
      shadowZ: 0,
      wInput: 0,
      hInput: 0,
      angleValue: 0,
      textSize: 0,
      fontFamily: '',
      fontFamilyArr: [
        {
          value: '宋体',
          label: '宋体'
        }, {
          value: '黑体',
          label: '黑体'
        }, {
          value: '楷体',
          label: '楷体'
        }, {
          value: '微软雅黑',
          label: '微软雅黑'
        }
        // {
        //   value: '仿宋体',
        //   label: '仿宋体'
        // }, {
        //   value: '行楷',
        //   label: '行楷'
        // }, {
        //   value: '方正姚体',
        //   label: '方正姚体'
        // }, {
        //   value: '幼圆',
        //   label: '幼圆'
        // }
      ],
      lineHeight: 0,
      recordArr: [],
      record: 0, // 最多撤销10次
      fabricLeftList: [
        { name: '文字', api: 'text', type: 1 },
        { name: '模板', api: 'product', type: 0 },
        { name: '形状', api: 'shape', type: 2 },
        { name: '素材', api: 'material', type: 3 },
        { name: '背景', api: 'background', type: 4 },
        { name: '上传', api: 'file' }
      ],
      leftListData: [],
      imgTemplate: {},
      categoryList: [],
      contentShow: false
      // testSVG: require('../../assets/img/xin.icons'),
      // testImg: require('../../assets/img/test.png')
    }
  },
  watch: {
  },
  created() {
    document.getElementById('layout__view').style.top = 0
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ffffff',
      crossOrigin: 'anonymous'
    })
    // 带参初始化
    if (this.$route.query.width && this.$route.query.height) {
      this.wcanInput = this.$route.query.width
      this.hcanInput = this.$route.query.height
      this.canvasName = this.$route.query.name
      this.handleCanvasSize()
    }
    if (this.$route.query.type && this.$route.query.id) {
      this.fullscreenLoading = true
      this.getImgData(this.$route.query.type, this.$route.query.id)
    }
    this.canvas.preserveObjectStacking = true
    // 绑定鼠标事件
    this.canvas.on('object:modified', (e) => {
      // console.log('???', e)
      // 宽高
      this.wInput = e.target.width * e.target.scaleX
      this.hInput = e.target.height * e.target.scaleY
      // 旋转
      this.angleValue = e.target.angle
      // 记录
      this.toCanvasObj()
    })
    this.canvas.on('mouse:up', (e) => {
      // 工具栏重置
      if (e.target !== null) {
        this.nowEl = e.target
        this.nowType = this.nowEl.type
        // 宽高
        this.wInput = e.target.width * e.target.scaleX
        this.hInput = e.target.height * e.target.scaleY
        // 透明度
        this.opacityValue = e.target.opacity * 100
        // 阴影
        if (e.target.shadow === null) {
          this.shadowColor = 'rgba(205, 88, 255, 1)'
          this.shadowX = 0
          this.shadowY = 0
          this.shadowZ = 0
        } else {
          this.shadowColor = e.target.shadow.color
          this.shadowX = e.target.shadow.offsetX
          this.shadowY = e.target.shadow.offsetY
          this.shadowZ = e.target.shadow.blur
        }
        // 填充
        this.bgColor = e.target.fill
        // 旋转
        this.angleValue = e.target.angle
        // 圆角
        if (e.target.cornerSize === null) {
          this.radiusValue = 0
        } else {
          this.radiusValue = e.target.rx
        }
        // 字体大小
        this.textSize = e.target.fontSize
        // 字体样式
        this.fontFamily = e.target.fontFamily
        // 行高
        this.lineHeight = e.target.lineHeight
      }
    })
    this.getCategory(1)
  },
  methods: {
    // 初始数据
    async initData(val, par) {
      // 测试
      const resources = [{ name: val }]
      const params = par
      const res = await this.api.restful({ resources, params })
      this.leftListData = res.data
      // console.log('vcecec', res.data, this.leftListData)
    },
    // 获取分类的内容
    async getCategory(type) {
      const resources = [{ name: 'category' }]
      const params = { type: type }
      const res = await this.api.restful({ resources, params })
      // console.log('res??', res)
      this.categoryList = res.data
    },

    // 根据ID请求已有数据
    async getImgData(type, id) {
      const resources = [{ name: 'search' }]
      const params = { type: type, id: id }
      const res = await this.api.restful({ resources, params })
      this.canvas.loadFromJSON(res.data.data, () => {
        this.canvas.renderAll()
        this.fullscreenLoading = false
      })
    },
    // 列表切换
    handleClick(tab, event) {
      console.log('handleClick', tab, event)
      this.leftListData = []
      // this.getCategory(tab.index)
      this.getCategory(tab.$attrs.type)
      const params = tab.name === 'file' ? { type: 1, user_id: this.$store.state.user.userInfo.id } : {}
      this.initData(tab.name, params)
      this.contentShow = false
    },
    // 改变单位
    changeScale() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
      if (this.scaleValue === 'px') {
        this.wcanInput = this.wcanInput / this.scaleInput
        this.hcanInput = this.hcanInput / this.scaleInput
        this.scaleInput = 1
      } else if (this.scaleValue === 'mm') {
        this.scaleInput = 0.085555
        this.wcanInput = this.wcanInput * this.scaleInput
        this.hcanInput = this.hcanInput * this.scaleInput
      }
      console.log('changeScale', this.scaleValue, this.scaleInput)
    },
    // 添加上传图片到画布
    handleUploadImg(el) {
      const url = el.url
      const index = el.url.lastIndexOf('.')
      const format = url.substring(index + 1)
      if (format !== 'svg') {
        const canvas = this.canvas
        fabric.Image.fromURL(el.url, (img) => {
          img.scale(0.5)
          img.set({
            left: 80,
            top: 120,
            opacity: 1
          })
          canvas.add(img)
          this.toCanvasObj()
        }, { crossOrigin: 'anonymous' })
      } else {
        this.handleChooseImg(el)
      }
    },

    // 添加svg图片
    handleChooseImg(el) {
      const canvas = this.canvas
      fabric.loadSVGFromURL(el.url, (obj, opt) => {
        const faObj = fabric.util.groupSVGElements(obj, opt)
        faObj.scale(0.5)
        faObj.set({
          left: 80,
          top: 120,
          opacity: 1
        })
        canvas.add(faObj)
        this.toCanvasObj()
      })
    },
    // 添加背景图片
    handleBg(el) {
      const canvas = this.canvas
      console.log('el.url', el)

      const url = el.url
      if (this.nowBg !== null) {
        canvas.remove(this.nowBg)
        canvas.renderAll()
      }
      fabric.Image.fromURL(url, (img) => {
        this.nowBg = img
        img.set({
          opacity: 1
        })
        canvas.add(img)
        canvas.moveTo(img, -23)
        this.toCanvasObj()
      }, { crossOrigin: 'anonymous' })
    },

    // 点击模板
    handleTemplate(item) {
      this.canvas.loadFromJSON(item.data)
      this.this.toCanvasObj()
    },

    // 点击添加东西 todo
    handleSome(item) {
      this.canvas.loadFromJSON(item.data, (data) => {
        console.log(JSON.parse(item.data))
      })
      this.toCanvasObj()
    },

    // 上传成功回调
    onSuccess() {
      this.$message.success('上传成功')
      this.initData('file', { type: 1, user_id: this.$store.state.user.userInfo.id })
    },

    // 鼠标进入
    handleMouseenter(item) {
      this.$refs['upload_' + item.id][0].style.display = 'block'
    },

    // 鼠标离开
    handleMouseleave(item) {
      for (const key in this.$refs) {
        if (this.leftListData.filter(item => 'upload_' + item.id == key).length) {
          this.$refs[key][0].style.display = 'none'
        }
      }
    },

    // 删除上传图片
    async handleDelete(item) {
      const url = item.url
      const index = url.lastIndexOf('file/')
      const filename = url.substring(index + 5)
      const resources = [{ name: 'deleteFile' }]
      const method = 'post'
      const data = {
        file_name: filename,
        id: item.id
      }
      const res = await this.api.restful({ resources, method, data })
      if (this.$isSucc(res)) {
        this.initData('file', { type: 0, user_id: this.$store.state.user.userInfo.id })
        this.$message.success('删除成功！！！')
      }
    },

    // 添加文本框
    handelAddText() {
      const canvas = this.canvas
      const text = new fabric.Textbox('点击编辑文本', {
        fontSize: 18,
        width: 200,
        breakWords: true,
        opacity: 1,
        fontFamily: '宋体'
      })
      canvas.add(text)
      this.toCanvasObj()
    },

    // 撤销or恢复
    handleRecord(num) {
      num === 1 ? this.record += 1 : this.record -= 1
      if (this.record < 0) {
        this.$message({ message: '不能再撤销了哦~', duration: 800, showClose: true })
        this.record = 0
      } else if (this.record > this.recordArr.length - 1) {
        this.$message({ message: '已经是最新的了~', type: 'success', duration: 800, showClose: true })
        this.record = this.recordArr.length - 1
      } else {
        console.log('撤销恢复', this.recordArr[this.record])
        this.fullscreenLoading = true
        this.canvas.loadFromJSON(this.recordArr[this.record], () => {
          this.canvas.renderAll()
          this.fullscreenLoading = false
        })
      }
      console.log('~~~', this.record, this.nowBg)
    },
    /** 工具 */
    // canvas大小
    handleCanvasSize() {
      this.canvas.setDimensions({ width: this.wcanInput / this.scaleInput, height: this.hcanInput / this.scaleInput })
    },
    handleCanvasBlee() {
      this.canvasPadding = this.bleeInput
    },
    // 翻转
    handleFlip(v) {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        [v]: -this.nowEl[v]
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 宽高
    handleSize() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        width: Number(this.wInput) / this.nowEl.scaleX,
        height: Number(this.hInput) / this.nowEl.scaleY
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 调节透明度
    handleOpacity() {
      if (this.nowEl === null) {
        return
      }
      const ov = this.opacityValue / 100
      this.nowEl.set({
        opacity: ov
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 填充色
    handleBgColor() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        fill: this.bgColor
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 阴影
    handleShadow() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        shadow: `${this.shadowColor} ${this.shadowX} ${this.shadowY} ${this.shadowZ}`
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 旋转
    handleRotate() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.rotate(this.angleValue)
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 圆角
    handleRadius() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        rx: this.radiusValue,
        ry: this.radiusValue
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 上下移图层
    handleMoveTo(val) {
      if (this.nowEl === null) {
        return
      }
      this.nowEl[val]()
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 删除元素
    handelDelete() {
      this.canvas.remove(this.nowEl)
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 字体样式
    handleTextStyle() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        fontFamily: this.fontFamily
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 字体大小
    handleTextSize() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        fontSize: this.textSize
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 字体粗细
    handleFontBN(TWeight) {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        fontWeight: TWeight
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 斜体
    handleFontStyle(Tstyle) {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        fontStyle: Tstyle
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 字体对齐方式
    handleFontAlign(Talign) {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        textAlign: Talign
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 行高
    handleFontLine() {
      if (this.nowEl === null) {
        return
      }
      this.nowEl.set({
        lineHeight: Number(this.lineHeight)
      })
      this.canvas.renderAll()
      this.toCanvasObj()
    },
    // 记录
    toCanvasObj() {
      if (this.record < 9) {
        this.recordArr.push(this.canvas.toJSON())
        this.record = this.recordArr.length - 1
      } else {
        this.recordArr.splice(0, 1)
        this.recordArr.push(this.canvas.toJSON())
      }
      console.log('记录', this.canvas.toJSON(), this.recordArr, this.record)
    },
    // 保存云端
    async uploadCanvas() {
      this.fullscreenLoading = true
      const _this = this
      const imgData = this.canvas.toDataURL({
        format: 'jpeg',
        quality: 1
      })
      this.BaseToFile(imgData, 'modify')
      const resources = [{ name: 'upload' }]
      const method = 'post'
      const data = new FormData()
      data.append('file', this.BaseToFile(imgData, 'modify'))
      const res1 = await this.api.restful({ resources, method, data })
      console.log('图片保存云端', res1)
      if (this.$isSucc(res1)) {
        let sizeT = ''
        if (this.scaleValue === 'px') {
          sizeT = this.wcanInput / this.scaleInput + ' x ' + this.hcanInput / this.scaleInput
        } else if (this.scaleValue === 'mm') {
          sizeT = this.wcanInput / this.scaleInput + ' x ' + this.hcanInput / this.scaleInput
        }
        const resources = [{ name: 'work' }]
        const data = {
          title: _this.canvasName,
          size: sizeT,
          thumbnail: res1.data,
          img_url: res1.data,
          data: JSON.stringify(this.canvas.toJSON())
        }
        const res = await this.api.restful({ resources, method, data })
        console.log('模板保存云端', res)
        this.$message.success('模块保存成功')
        this.fullscreenLoading = false
      } else {
        this.$message.error('保存失败！请检查网络后重试')
        this.fullscreenLoading = false
      }
    },
    // Base64装换为文件
    BaseToFile(database64, filename) {
      const arr = database64.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },

    // 保存本地
    downCanvas() {
      if (this.pageList.length < 2) {
        const imgData = this.canvas.toDataURL({
          format: 'jpeg',
          quality: 1
        })
        this.canvasName === '' ? this.canvasName = 'ytb' + (new Date()).getTime() : ''
        const imgDown = document.createElement('a')
        imgDown.href = imgData
        imgDown.download = this.canvasName + '.jpeg'
        imgDown.click()
      } else {
        const promises = []     
        const cache = {}   
        const _this = this
        let zip = new JSZip()
        let img = zip.folder("youtubang")
        this.pageList.forEach((el,ind) => {
          const promise = this.getFile(el.url).then(data => {
            img.file(`tu${ind}.png`,data,{binary:true})
            cache[`tu${ind}`] = data      
          })
          promises.push(promise)
        })
        Promise.all(promises).then(() => {
          zip.generateAsync({type:'blob'})
          .then(function(con) {
            FileSaver.saveAs(con, `${_this.canvasName}.zip`);
          })
        })
      }
    },
    // 获取文件
    getFile(url) {
      let that = this
      return new Promise((res, rej) => {
        axios({
          method: 'get',
          url,
          responseType: 'arraybuffer',
          onDownloadProgress: function (progressEvent) {
            
          }
        })
        .then(data => {
          res(data.data)
        })
        .catch(error => {
          rej(error.toString())
        })
      })
    },
    // 点击下边的预览图
    async clickPreview(ind) {
      this.fullscreenLoading = true
      console.log('clickPreview1', ind, this.canvasChooseIndex, this.pageList[this.canvasChooseIndex])
      // 将当前画布信息保存
      if (this.pageList[this.canvasChooseIndex] !== undefined) {
        this.pageList[this.canvasChooseIndex].canvasData = JSON.stringify(this.canvas.toJSON())
        if (this.pageList[this.canvasChooseIndex].canvasData !== '') {
          this.canvas.loadFromJSON(this.pageList[this.canvasChooseIndex].canvasData, () => {
            this.canvas.renderAll()
            this.canvas.set('backgroundColor', '#ffffff')
          })
          const imgData = this.canvas.toDataURL({
            format: 'jpeg',
            quality: 1
          })
          console.log('no null this.pageList', this.pageList)

          const resources = [{ name: 'upload' }]
          const method = 'post'
          const data = new FormData()
          data.append('file', this.BaseToFile(imgData, 'modify'))
          const res = await this.api.restful({ resources, method, data })
          console.log('切换画布图片保存', res)
          this.pageList[this.canvasChooseIndex].url = res.data
        }
      }
      // 保存后再切换画布
      this.canvasChooseIndex = ind
      if (this.pageList[this.canvasChooseIndex].canvasData !== '') {
        this.canvas.loadFromJSON(this.pageList[this.canvasChooseIndex].canvasData, () => {
          this.canvas.renderAll()
          this.fullscreenLoading = false
        })
      } else {
        this.canvas.clear()
        this.fullscreenLoading = false
      }
      console.log('clickPreview2', ind, this.canvasChooseIndex, this.pageList)
    },
    // 点击下边的预览图的加号
    clickPreviewAdd(ind) {      
      this.pageList.splice(this.canvasChooseIndex + 1, '', { url: '', ind: ind + 1, canvasData: '' })
      console.log('clickPreviewAdd', ind, this.pageList)
    },
    // 点击下边的预览图的回收桶
    clickPreviewDelete(ind) {
      console.log('clickPreviewDelete', ind, this.canvasChooseIndex)
      if (this.pageList.length > 1) {
        this.pageList.splice(ind, 1)
      } else {
        this.$message({ message: '不能再删了哦~', duration: 500, showClose: true })
      }
    }
  }

}
</script>
<style lang="less" scoped>
li {
  list-style: none;
}
.img__down {
  position: absolute;
  bottom: 14vh;
  right: 50px;
}
.fabric__editor {
  top: 0!important;
  .fabric__top {
    height: 6vh;
    display: grid;
    grid-template-columns: 1.1fr 3fr 1.1fr;
    .top__center {
      background-color: #33373c;
      display: grid;
      grid-template-columns: repeat(3,1fr);
      font-size: .1rem;
      .top__tips {
        grid-column-start: 1;
        grid-column-end: 3
      }
      .top__operation, .top__tips {
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          display: flex;
          align-items: center;
          margin: 0 20px;
          cursor: pointer;
        }
        img {
          width: 40px;
          height: 40px;
        }
      }
      .top__size {
        color: #ffffff;
        display: flex;
        justify-content: start;
        p {
          display: flex;
          align-items: center;
        }
        span {
          display: flex;
          justify-content: start;
          align-items: center;
          .el-input {
            width: 50%;
            margin-right: .05rem;
          }
        }
      }
    }
    .top__right {
      background-color: #ffffff;
      font-size: .2rem;
      font-weight: 600;
      padding-top: 2vh;
      padding-left: 15px;
    }
  }
  .fabric__bottom {
    display: grid;
    grid-template-columns: 1.1fr 3fr 1.1fr;
    .fabric__left {
      background-color: #ffffff;
      display: flex;
      .el-tabs--left {
        width: 100%;
      }
      /deep/.el-tabs__header.is-left {
        margin-right: 0;
      }
      .el-tabs__item.is-left {
        height: 5vh;
      }
      /deep/.el-tabs__content {
        overflow-y: auto;
      }
      .left__content {
        width: 100%;
        height: 94vh;
        background-color: #f8f8f8;
        li {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding-left: .02rem;
          img, div {
            background-color: #f1f1f1;
            width: 70px;
            height: 70px;
            margin: 2px;
            line-height: 70px;
            cursor: pointer;
          }
        }
        .left__shape,
        .left__material {
          width: 99%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          span {
            display: flex;
            flex-direction: column;
            align-items: center;
            line-height: normal;
          }
        }
        .shape__content,
        .material__content {
          width: 99%;
          height: auto;
          background-color: white;
          p {
            height: .4rem;
            line-height: .4rem;
            background-color: #f7f7f7;
            margin: .05rem;
            padding-left: .05rem;
            transition-property: color,background-color;
            transition: .5s ease;
          }
          p:hover {
            background-color: #409EFF;
            color: white;
          }

        }

        .tab__content{
          padding: 10px;
          /deep/ .el-button{
            border-radius: 0;
            width: 100%;
          }
          .tab__classify{
            display: flex;
            flex-wrap: wrap;
            .classify_item{
              width: 84px;
              height: 84px;
              margin-bottom: 40px;
              margin-right: 21px;
              cursor: pointer;
              img{
                width: 100%;
                height: 100%;
              }
            }
          }
          .tab__list{
            .tab__return{
              background-color: #e9e9e9;
              color: #7a7a7a;
              padding: 8px;
              font-size: 13px;
              cursor: pointer;
              transition: .2s ease-in-out;
            }
            .tab__return:hover{
              background-color: #3a8ee6;
              color: white;
            }
            .tab_item{
              float: left;
              margin-top: 15px;
              img{
                display: block;
                width: 84px;
                height: 84px;
                margin-bottom: 9px;
                margin-right: 9px;
                cursor: pointer;
              }
            }
          }
        }

        .upload__content{
          padding: 10px;
          /deep/ .el-upload{
            width: 100%;
          }
          /deep/ .el-button{
            border-radius: 0;
            width: 100%;
          }
          .upload__list{
            display: flex;
            flex-wrap: wrap;
            margin-top: 15px;
            .upload__item{
              width: 84px;
              height: 84px;
              margin-bottom: 9px;
              margin-right: 9px;
              cursor: pointer;
              img {
                width: 100%;
                height: 100%;
              }
              .delete{
                position: absolute;
                width: 30px;
                height: 30px;
                background: white;
                z-index: 100;
                top: 0px;
                right: 0px;
                text-align: center;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
    .fabric__center {
      background-color: #ececec;
      height: 93vh;
      overflow: auto;
      /deep/.canvas-container {
        margin: 50px auto 0;
        #canvas {
          background-color: #ffffff;
        }
      }
      .page__preview {
        width: 100%;
        height: 13vh;
        background-color: #f8f8f8;
        position: fixed;
        bottom: 0;
        overflow-x: auto;
        overflow-y: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
        li {
          background-color: #ffffff;
          height: 10vh;
          width: 5vw;
          box-shadow: 0 0 6px rgba(0,0,0,.15);
          margin-right: 23px;
          padding: .8vh .8vw;
          cursor: pointer;
          .icon {
            width: 15px;
            height: 15px;
            padding: 5px;
            border-radius: 50px;
            box-shadow: 0 0 6px rgba(0,0,0,.23);
            position: absolute;
            background-color: #ffffff;
            margin-left: 5.3vw;
            cursor: pointer;
          }
          .preview__div {
            width: 100%;
            height: 100%;
          }
          .canvas__preview {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }
        }
        .showBorder {
          border: 1px solid #057cd9;
        }
      }
    }
    .fabric__right {
        background-color: #f8f8f8;
      div {
        .elSize {
          display: flex;
          justify-content: start;
          span {
            display: flex;
            justify-content: start;
            align-items: center;
            width: 7vw;
          }
        }
        li {
          font-size: .15rem;
          display: flex;
          justify-content: start;
          align-items: center;
          margin-left: 15px;
          margin-bottom: 10px;
          .tool__name {
            display: block;
            width: 3vw;
          }
          img {
            width: 30px;
            height: 30px;
          }
          .right__tool {
            margin-left: 20px;
            p{
              display: flex;
              justify-content: start;
              align-items: center;
              margin: 0;
              border: none;
              span{
                font-size: .1rem;
                font-weight: 400;
                margin-right: 10px;
                display: flex;
                width: 2vw;
              }
            }
          }
          .el-slider {
            width: 10vw;
          }
          .el-color-picker__trigger {
            overflow-x: hidden;
          }
        }
      }
      .text__tool {
        p {
          font-size: .2rem;
          font-weight: 600;
          padding-top: 2vh;
          padding-left: 15px;
          border-top: 1px solid #e0e0e0;
        }
        li {
          .Ttool__name {
            display: block;
            width: 6vw;
          }
          .el-input {
            width: 80%;
          }
          .size__input {
            width: 23%;
          }
        }
        .Ttool__label {
          img {
            width: 25px;
            height: 25px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
