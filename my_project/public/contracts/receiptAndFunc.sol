pragma solidity ^0.4.22;
import "./companyAndBank.sol";
contract receiptAndFunc is companyAndBank{
    struct receipt{
        string rfrom;//债务人
        string rto;//债权人
        uint256 mounts;//债务数额
    }
    receipt[] receipts;
    function fun1(string a,string b,uint256 c)returns(bool){
        //a 欠 b c元
        if(!isCompany(a))
            return false;
        if(!isCompany(b)&&!isBank(b))
            return false;
        if(keccak256(abi.encodePacked(a))==keccak256(abi.encodePacked(b)))
            return false;
        receipts.push(receipt({
            rfrom:a,
            rto:b,
            mounts:c
        }));
        return true;
    }
    function fun2(string a,string b,string c,uint256 d)returns(bool){
        //a 把 b 欠的 d元 转让给 c
        if(!isCompany(a))
            return false;
        if(!isCompany(b))
            return false;
        if(!isCompany(c)&&!isBank(c))
           return false;
        if(keccak256(abi.encodePacked(a))==keccak256(abi.encodePacked(b)))
            return false;
        if(keccak256(abi.encodePacked(a))==keccak256(abi.encodePacked(c)))
            return false;
        if(keccak256(abi.encodePacked(b))==keccak256(abi.encodePacked(c)))
            return false;
        uint256 sum=0;
        for(uint j=0;j<receipts.length;j++){
            if(keccak256(abi.encodePacked(receipts[j].rfrom))==keccak256(abi.encodePacked(b)) && keccak256(abi.encodePacked(receipts[j].rto))==keccak256(abi.encodePacked(a))){
                sum+=receipts[j].mounts;
            }
        }//计算所有b 欠 a的钱
        if(sum>=d){
            uint256 dd=d;
            for(uint i=0;i<receipts.length;i++){
                if(keccak256(abi.encodePacked(receipts[i].rfrom))==keccak256(abi.encodePacked(a)) && keccak256(abi.encodePacked(receipts[i].rto))==keccak256(abi.encodePacked(c))){
                    if(dd>=receipts[i].mounts){
                        dd-=receipts[i].mounts;
                        if(i<receipts.length-1){
                            receipts[i]=receipts[receipts.length-1];
                            i--;
                        }
                        receipts.length--;
                    }
                    else{
                        receipts[i].mounts-=dd;
                        break;
                    }
                }
            }
            for(i=0;i<receipts.length;i++){
                if(keccak256(abi.encodePacked(receipts[i].rfrom))==keccak256(abi.encodePacked(b)) && keccak256(abi.encodePacked(receipts[i].rto))==keccak256(abi.encodePacked(a))){
                    if(d>=receipts[i].mounts){
                        d-=receipts[i].mounts;
                        receipts[i].rto=c;
                    }
                    else{
                        receipts[i].mounts-=d;
                        receipts.push(receipt({
                            rfrom:b,
                            rto:c,
                            mounts:d
                        }));
                        break;
                    }
                }
            }
            return true;
        }
        return false;
    }
    function fun3(string a,string b,uint256 c)returns(bool){
        //a 向银行 b 借 c元
        if(!isCompany(a))
            //return false;
        if(!isBank(b))
            return false;
        uint256 sum=0;
        uint j;
        for(j=0;j<receipts.length;j++){
            if(keccak256(abi.encodePacked(receipts[j].rto))==keccak256(abi.encodePacked(a)))
                sum+=receipts[j].mounts;
        }
        if(sum>=c){
            for(uint i=0;i<receipts.length;i++){
                if(keccak256(abi.encodePacked(receipts[i].rto))==keccak256(abi.encodePacked(a))){
                    if(c>=receipts[i].mounts){
                        c-=receipts[i].mounts;
                        receipts[i].rto=b;
                    }
                    else{
                        receipts[i].mounts-=c;
                        receipts.push(receipt({
                            rfrom:receipts[i].rfrom,
                            rto:b,
                            mounts:c
                        }));
                        break;
                    }
                }
            }
            return true;
        }
        return false;
    }
    function fun4(string a)returns(bool){
        //所有a欠的钱还清
        if(!isCompany(a))
            return false;
        for(uint i=0;i<receipts.length;i++){
            if(keccak256(abi.encodePacked(receipts[i].rfrom))==keccak256(abi.encodePacked(a))){
                if(i<receipts.length-1){
                    receipts[i]=receipts[receipts.length-1];
                    i--;
                }
                receipts.length--;
            }
        }
    }
    function fun5(string a)returns(bool){
        //所有欠a的钱还清
        if(!isCompany(a))
            return false;
        for(uint i=0;i<receipts.length;i++){
            if(keccak256(abi.encodePacked(receipts[i].rto))==keccak256(abi.encodePacked(a))){
                if(i<receipts.length-1){
                    receipts[i]=receipts[receipts.length-1];
                    i--;
                }
                receipts.length--;
            }
        }
    }
}
