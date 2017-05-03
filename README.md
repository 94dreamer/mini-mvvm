### 小型的mvvm框架，实现业务网站的双向数据绑定

1. 双向数据处理能力的转换器，实现对数据和视图操作的监听，解放繁杂的DOM操作。
2. 视图变动的监听 —— View将变动通知到ViewModel，然后ViewModel对Model进行更新。addEventListener
3. 数据模型的监听 —— Model将变动通知到ViewModel，然后ViewModel对View进行更新。Object.defineProperty(obj, prop, descriptor)

 MVVM的主要流程包括(View)视图扫描、(Model)模型构建、以及关联视图和模型(ViewModel)
