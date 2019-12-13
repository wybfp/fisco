pragma solidity ^0.4.22;
contract companyAndBank{
    struct company{
        string cname;//公司名
        string status;//标记，区分银行和普通公司
    }
    company[] companys;
    company[] banks;
    function isCompany(string a)returns(bool){
        uint i;
        for(i=0;i<companys.length;i++){
            if(keccak256(abi.encodePacked(companys[i].cname))==keccak256(abi.encodePacked(a)))
                return true;
        }
        return false;
    }
    function isBank(string a)returns(bool){
        uint i;
        for(i=0;i<banks.length;i++){
            if(keccak256(abi.encodePacked(banks[i].cname))==keccak256(abi.encodePacked(a)))
                return true;
        }
        return false;
    }
    function addCompany(string a)returns(bool){
        if(isCompany(a))
            return false;
        companys.push(company({
            cname:a,
            status:"COMPANY"
        }));
        return true;
    }
    function addBank(string a)returns(bool){
        if(isBank(a))
            return false;
        banks.push(company({
            cname:a,
            status:"BANK"
        }));
        return true;
    }
}
