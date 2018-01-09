
//数据转型
function changeData(data){
    
    let temp = [];
    data.forEach((item) => {
        var t = {};
        t.name = item.name;
        t.need=[];t.need.push(item.NeedA,item.NeedB,item.NeedC);
        t.max=[];t.max.push(item.maxA,item.maxB,item.maxC);       
        t.allocation=[];t.allocation.push(item.allocationA,item.allocationB,item.allocationC);
        temp.push(t);
    });
    temp.available = [];
    temp.available[0] = data[0].availableA;
    temp.available[1] = data[0].availableB;
    temp.available[2] = data[0].availableC;
    console.log(temp.available[0],temp.available[1],temp.available[2])
    return temp;

}

 //银行家算法，判断是否有安全序列'
 //分配进程索引，现有的资源分配
//  rAllot = [1, 2, 3]
export function BankerAlgorithm (pro, rAllot, dSource) {
    const len = 3;//资源数量
    const source = changeData(dSource);
    

    //判断是否大于所需资源
    for(let i = 0; i < len; i++) {
        if (rAllot[i] > source[pro].need[i]) {
            return {
                result: false,
                message: '分配的资源数超过进程所需要的资源'
            }
        }
    }

    //判断是否有足够的资源
    for(let i = 0; i < len; i++) {
        if (rAllot[i] > source.available[i]) {
            return {
                result: false,
                message: '没有足够的资源科分配'
            }
        }
    }

    //假设分配后，修改相应数据

    let ifAllot = source;

    for(let i = 0; i < len; i++) {
        ifAllot.available[i] -= +rAllot[i];
        ifAllot[pro].need[i] -= +rAllot[i];
        ifAllot[pro].allocation[i] += +rAllot[i];
    }
    //检查是否存在安全序列
    return checkSafe(ifAllot);
}




//检查source的资源分配情况是会否存在安全序列
function checkSafe (source) {
    console.log(source);

    let ksource = JSON.parse(JSON.stringify(source));
    ksource.available = source.available;
    let len = 3;

    while(1){
        let long = ksource.length; //数组长度
        console.log(long)
        for(let index =0;index< ksource.length; index++){
            let item = ksource[index];
            let count = 0;
            for(let i = 0; i < len ; i++) {
                if(item.need[i] <= ksource.available[i] ){
                    count++;
                } else {
                    break;
                }
            }
            //找到了
            if(count === 3) {
                ksource.available[0] += +ksource[index].allocation[0];
                ksource.available[1] += +ksource[index].allocation[1];
                ksource.available[2] += +ksource[index].allocation[2];
                ksource.splice(index,1);
                break;
            } else {
                console.log(--long,'long')
            }
        };

        //判断资源是否已分配完成
        if (!ksource.length){
            return {
                result: true,
                message:'资源分配成功'
            }
        }
        //循环后没找到可分配的进程，退出循环
        if(long === 0) {
            return {
                result: false,
                message: '不存在安全序列，无法分配'
            }
        } 
    }
}
