pragma solidity ^0.4.22;
import "./console.sol";
import "./receiptAndFunc.sol";
contract main is receiptAndFunc,console{
    string str;
    function listReceipt(){
        for(uint j=0;j<receipts.length;j++){
            uint len1=bytes(receipts[j].rfrom).length;
            uint len2=bytes(receipts[j].rto).length;
            bytes memory rfrom = bytes(receipts[j].rfrom);
            bytes memory rto = bytes(receipts[j].rto);
            string memory sret = new string(rfrom.length + rto.length+1);
            bytes memory bret = bytes(sret);
            uint k = 0;
            for (uint i = 0; i < rfrom.length; i++)
                bret[k++] = rfrom[i];
            bret[k++]='-';
            for (i = 0; i < rto.length; i++) 
                bret[k++] = rto[i];
            log(string(bret),receipts[j].mounts);
        }
    }
    function listCompany(){
        for(uint i=0;i<companys.length;i++){
            log(companys[i].cname,companys[i].status);
        }
    }
    function listBank(){
        for(uint i=0;i<banks.length;i++){
            log(banks[i].cname,banks[i].status);
        }
    }

    function set(string s){
        str=s;
    }
    function get()returns(string){
        string s=str;
        return s;
    }
}
