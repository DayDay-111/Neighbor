export const url = {
    login:'/user/login', //{email,password} 
    register:'/user/register', //{email,password,FirstName,LastName} 注册，
    emailcheck:'/user/emailcheck', //{email}邮箱验证是否数据库里有
    profile:'/profile', //{uid} 返回个人信息

    block:'/block',// {uid} 返回用户所属的社区block信息,没有社区返回0
    exitBlock:'/exitBlock',// {uid} 用户退出当前社区block
    applyBlock:'/applyBlock',// {uid,bid} 用户申请加入某个社区(当用户没有社区时)
    blockList:'/blockList',// 显示系统定义的所有社区
    findblock:'/findblock',// {uid} 查询用户属于哪个社区block，返回block信息
    findhood:'/findhood',// {uid} 查询用户属于哪个大社区hood，返回hood信息

    createScopeSubject :'/createScopeSubject ' ,//{uid,title,type,text,coordinate} 创建话题 type=3（代表block话题），type=4（代表hood话题）
    BlockSubject:'/BlockSubject' ,//{uid} 查询用户所属的社区block所有的话题
    SubMessage:'/SubMessage' ,//{sid} 查询某个话题中的所有讨论
    HoodSubject:'/HoodSubject' ,//{uid} 查询用户所属的大社区hood所有的话题
    HoodMemberList:'/HoodMemberList' ,//{hid} 查询大社区hood里所有的成员
    createSubect:'/createSubect' ,//{uid,touid,title,type,text,coordinate} type=1 好友话题，type=2 邻居话题,,这两种话题都只可以指定一个人创建，touid就是指定的那个人,可以从hood的成员列表选择朋友，需要对方同意
    friendList:'/friendList' ,//{uid} 通过用户uid查询朋友列表
    friendSubject:'/friendSubject',//{uid} 通过用户uid查询好友话题
    SubMessage:'/SubMessage' ,//{sid} 这个和上面可以用同一个

    //可以从hood成员列表选择邻居，可以单方面直接确定，然后发话题消息
    neighborList:'/neighborList' ,//{uid} 通过用户uid查询邻居列表
    neighborSubject:'/neighborSubject' ,//{uid} 通过用户uid查询邻居话题
    SubMessage:'/SubMessage' ,//{sid}
    //搜索可以通过关键字或者地图上的地点查询，
    searchByKey:'/searchByKey' ,//{uid,keyword} keyword为用户输入，返回所有符合要求的message
    exit:'/exit' ,//退出
}