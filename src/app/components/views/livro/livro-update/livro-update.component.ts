import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Livro } from "../livro.model";
import { LivroService } from "../livro.service";

@Component({
  selector: "app-livro-update",
  templateUrl: "./livro-update.component.html",
  styleUrls: ["./livro-update.component.css"],
})
export class LivroUpdateComponent implements OnInit {
  titulo = new FormControl("", [Validators.minLength(3)]);
  nomeAutor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(3)]);

  id_cat: String = "";
  livro: Livro = {
    id: "",
    titulo: "",
    nomeAutor: "",
    texto: "",
  };

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get("id_cat")!;
    this.livro.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro.titulo = resposta.titulo;
      this.livro.nomeAutor = resposta.nomeAutor;
      this.livro.texto = resposta.texto;
    });
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message("livro atualizado com sucesso");
    }, err=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.message("Falha ao atualizar livro");
    });
  }

  getMessage() {
    if (this.titulo.invalid) {
      return " Campo e quantidade de caracteres obrigatórios ";
    }
    if (this.nomeAutor.invalid) {
      return " Campo e quantidade de caracteres obrigatórios ";
    }
    if (this.texto.invalid) {
      return " Campo e quantidade de caracteres obrigatórios ";
    }
    return false;
  }
}
