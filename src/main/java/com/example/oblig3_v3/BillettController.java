package com.example.oblig3_v3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;

    @PostMapping("/lagreBillett")
    public void lagreBillett(Billett enBillett){
        rep.lagreBillett(enBillett);
    }


    @GetMapping("/hentBillett")
    public List<Billett> hentBilletter(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettBilletter")
    public void slettBilletter(){
        rep.slettAlleBilletter();
    }
}


