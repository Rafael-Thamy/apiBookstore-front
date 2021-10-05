import { Livro } from "./../livro.model";
import { ActivatedRoute, Router } from "@angular/router";
import { LivroService } from "./../livro.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-livro-create",
  templateUrl: "./livro-create.component.html",
  styleUrls: ["./livro-create.component.css"],
})
export class LivroCreateComponent implements OnInit {
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
  }

  create(): void {
    this.service.create(this.id_cat, this.livro).subscribe(
      (resposta) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("livro criado com sucesso");
      },
      (err) => {
        this.router.navigate([`categorias/${this.id_cat}/livros`]);
        this.service.message("Erro ao criar o livro");
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
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
