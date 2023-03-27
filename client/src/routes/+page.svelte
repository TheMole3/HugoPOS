<script>
    import ProductViewer from "./productViewer.svelte";
    import Nav from "./Nav.svelte";
    import Header from "./Header.svelte";
    import ChoosePaymentMethod from './pay/ChoosePaymentMethod.svelte'
    import PayAmount from "./pay/PayAmount.svelte";
    import CreateProduct from "./CreateProduct.svelte";
    import Bluetooth from "./Bluetooth.svelte";

    let products = []

    if(typeof localStorage !== "undefined") {localStorage.setItem("products", JSON.stringify([
        {
            name: "Plopp",
            price: 5,
            moms: 0.12,
            image: "", // https://www.sockerbiten.org/wp-content/uploads/2021/08/DSC_1361-720x482.jpg
            count: 0
        },
        {
            name: "Kexchoklad",
            price: 7,
            moms: 0,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ-ZyZ96zDJi9d03oo6BENcEXGFE7cuo3GdQ&usqp=CAU",
            count: 0
        },
        {
            name: "Cola",
            price: 10,
            moms: 0,
            image: "https://images.summitmedia-digital.com/yummyph/images/2022/08/25/coca-cola-sugar-shortage-affects-bottling-plants.png",
            count: 0
        },
        {
            name: "Fanta",
            price: 10,
            moms: 0.12,
            image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
            count: 0
        },
        {
            name: "Sourcream",
            price: 15,
            moms: 0.12,
            image: "https://cdn.shopify.com/s/files/1/0512/9037/4339/products/estrella-chips-sourcream-minipase-40g-798114_1200x1200.jpg?v=1635554585",
            count: 0
        },
        {
            name: "Salta chips",
            price: 15,
            moms: 0.12,
            image: "https://www.cooperscandy.com/upload/prod/29347.jpg",
            count: 0
        },
        {
            name: "Center",
            price: 2,
            moms: 0.12,
            image: "data:image/jpeg;base64,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ERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED/9k=",
            count: 0
        },
        {
            name: "Popcorn",
            price: 5,
            moms: 0.12,
            image: "data:image/jpeg;base64,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",
            count: 0
        },
        
    ]))}

    let payment = {
        type: "",
        amount: 0
    }

    $: {
        if(products) {
            products = products.filter((product) => {
                if(!(Object.keys(product || {}).length === 0)) return true
            }) 
        }

        if (typeof localStorage !== "undefined") {
            //localStorage.setItem("products", JSON.stringify(products))
            //localStorage.setItem("payment", JSON.stringify(payment))
        }
    }

    let editMode = false;

    // State & screen
    let screen = 4
    let setScreen = (scr) => {
        screen = scr
        history.pushState({ screen: scr }, "Hugo POS " + scr);
    }
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        window.onpopstate = (event) => {
            console.log(event)
            screen = event.state.screen || 0

            products = JSON.parse(localStorage.getItem("products"))
            payment = JSON.parse(localStorage.getItem("payment"))
        }; 

        products = JSON.parse(localStorage.getItem("products"))
        payment = JSON.parse(localStorage.getItem("payment"))
    }

</script>

<div class="min-h-screen w-screen absolute bg-base-200">

    {#if screen == 0}
        <Header bind:editMode={editMode}></Header>

        
        <div class="m-4 grid-cols-3 gap-4 grid">
            {#if products}
                {#each products as product }
                    <ProductViewer editMode={editMode} bind:product={product}></ProductViewer>
                {/each}              
            {/if}

            {#if editMode}
                <div on:click={() => {setScreen(3)}} class="p-1 w-full aspect-square">
                    <div class="rounded-xl card indicator w-full h-full border-dashed border-2 border-gray-700">
                        <div class="pointer-events-none cursor-pointer min-h-full select-none flex justify-center items-center ">
                            <svg class="w-1/2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                    </div>
                </div>
            {/if}
            
        </div>

        <Nav bind:setScreen={setScreen} bind:products={products}></Nav>

    {:else if screen == 1}
        <ChoosePaymentMethod bind:setScreen={setScreen} bind:payment={payment} bind:products={products}></ChoosePaymentMethod>
    {:else if screen == 2}
        <PayAmount bind:setScreen={setScreen} bind:payment={payment} bind:products={products}></PayAmount>
    {:else if screen == 3}
        <CreateProduct bind:setScreen={setScreen}></CreateProduct>
    {:else if screen == 4}
        <Bluetooth></Bluetooth>
    {/if}
    
</div>