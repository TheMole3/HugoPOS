<script>
    import ProductViewer from "./productViewer.svelte";

    
    let product = {
    }

    let fakePrice;
    $:{
        product.price = parseInt(fakePrice);
        //fakePrice = parseInt(fakePrice).toString();
    }

    
    let images;
    $: {
        console.error(images)
        if(images && images[0]) {
            const reader = new FileReader();
            console.error("here")

            reader.addEventListener(
                "load",
                (a) => {
                    product.image = reader.result
                    console.log(reader)
                },
                false
            );

            reader.readAsDataURL(images[0]);
        }
    }

    
</script>

<div class="w-full h-full p-4">
    <div class="grid-cols-3 gap-4 grid">
        <div></div>
        <ProductViewer product={product}></ProductViewer>
    </div>

    <input bind:value={product.name} type="text" placeholder="Namn" class="input w-full mt-10" />
    <input bind:value={fakePrice} type="number" placeholder="Pris" class="input w-full mt-4" />

    <div class="form-control w-full mt-4">
        <label class="label">
          <span class="label-text">Moms</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Välj en momssats</option>
          <option>25%</option>
          <option>12%</option>
          <option>6%</option>
          <option>0%</option>
        </select>
    </div>

    <div class="form-control w-full mt-4">
        <label class="label">
            <span class="label-text">Välj eller ta en bild</span>
        </label>
        <input bind:files={images} type="file" accept="image/*" class="file-input w-full" />
    </div>

</div>