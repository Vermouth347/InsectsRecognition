// index.js
// 获取应用实例
const DB = wx.cloud.database().collection("list")

Page({
  //上传图片
   add(){
        let that = this;
        console.log("点击了上传")

        wx.showActionSheet({
          itemList: ['拍照', '从相册选择'],
          itemColor: '',
          //成功时回调
          success: function (res) {
            if (!res.cancel) {
              /*
               res.tapIndex返回用户点击的按钮序号，从上到下的顺序，从0开始
               比如用户点击本例中的拍照就返回0，相册就返回1
               我们res.tapIndex的值传给chooseImage()
              */
              that.chooseImage()
            }
          },
          //失败时回调
          fail: function (res) {
            console.log('调用失败')
           },
          complete: function (res) { },
        })

   },
      
    chooseImage(){
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            console.log("选择成功",res)
            that.uploadImg(res.tempFilePaths[0]);
          }
        })
    },
    uploadImg(fileUrl){
        wx.cloud.uploadFile({
          cloudPath: 'inset.png', // 上传至云端的路径
          filePath: fileUrl, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log("上传成功",res)
          },
          fail: console.error
        })
      }
})
  


 
