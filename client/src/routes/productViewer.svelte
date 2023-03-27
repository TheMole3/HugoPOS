<script>
    import { longpress } from './actions'

    export let product;
    export let editMode;

    let addItem = () => {
        if(editMode) return product = {};

        product.count++
        window?.navigator?.vibrate?.(50);
    }
    let removeItem = () => {
        if(editMode) return product = {};
        if(product.count <= 0) return;
        product.count--
        window?.navigator?.vibrate?.(100);
    }
</script>


<div use:longpress on:longpress={removeItem} on:shortpress={addItem} class="rounded card indicator w-full bg-base-100 shadow-xl">
    <div class="pointer-events-none cursor-pointer min-h-full select-none">
        {#if product.count}
            <span class="indicator-item badge badge-accent">{product.count}</span> 
        {/if}

        {#if editMode}
            <span class="indicator-item badge badge-accent">
                <svg class="h-full absolute aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </span> 
        {/if}

        {#if product.image}
            <figure class="rounded-t aspect-[6/4] overflow-hidden">
                <img class="w-max h-max" src={product.image} alt="{product.name}"/>
            </figure>
        {:else}
            <div class="rounded-t aspect-[6/4] overflow-hidden w-full flex justify-start items-center" >
                <span class="justify-center w-full text-center font-bold text-sm break-words">{product.name || "Produkt"}</span>
            </div>
        {/if}


        <div class="card-body gap-0 p-1 flex justify-center">
            <span class="justify-center text-center font-bold text-xs">{product.image?product.name:"​"}</span>
            <span class="justify-center text-center text-xs">{ product.price ? (product.price * (1 + product.moms)).toFixed(2) : "-"} kr</span>
        </div>
    </div>
</div>
