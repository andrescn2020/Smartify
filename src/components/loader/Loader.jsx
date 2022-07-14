import React, { useEffect } from "react";

export default function Loader(){
    return (
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
}