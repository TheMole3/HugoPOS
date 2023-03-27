<script>
    export let products;
    export let setScreen;

    let money = 0;
    $: {
        if(products) money = products.reduce(function (acc, obj) { return acc + (obj.price * obj.count * ( 1 + obj.moms )); }, 0);
    }

    let clear = () => {
        for(let productI in products) {
            products[productI].count = 0;
        }
    }
</script>

<div class="btm-nav">
    <div>
        Total {Math.floor(money).toFixed(2)}
    </div>
    <button on:click={() => {setScreen(1)}} class="bg-success active:brightness-75">
       Ta betalt
    </button>

    <button on:click={clear} class="basis-40 bg-error active:brightness-75">
        <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</div>