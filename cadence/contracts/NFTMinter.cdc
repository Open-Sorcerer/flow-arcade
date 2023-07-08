// NFT Minter 

// Instant NFT Minter which takes in the metadata and mints the NFT
// The NFT is then transferred to the user

pub contract NFTMinter {
    
    // NFT Resource Type 
    pub resource NFT { 
        // unique ID of the NFT
        pub let id: UInt64

        // string mapping to hold metadata
        pub var metadata: {String: String}


        init(init_id: UInt64, init_metadata: {String: String}) {
            self.id = init_id
            self.metadata = init_metadata
        }
    }

    pub resource interface NFTReceiver {
        pub fun deposit(token: @NFT)
        pub fun getIDs(): [UInt64]
        pub fun getNFT(id: UInt64): @NFT
        pub fun idExists(id: UInt64): Bool
    }

    // function to create a new NFT
    pub fun createNFT(id: UInt64, metadata: {String:String}): @NFT {
        let newNFT <- create NFT(init_id: id, init_metadata: metadata);
        return <-newNFT;
    }

}