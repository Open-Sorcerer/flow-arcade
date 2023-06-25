// NFT Minter 

// Instant NFT Minter which takes in the metadata and mints the NFT
// The NFT is then transferred to the user

pub contract NFTMinter {
    
    // NFT Resource Type 
    pub resource NFT { 
        pub let id: UInt64

        init(init_id: UInt64) {
            self.id = init_id
        }
    }

    pub resource interface NFTReceiver {
        pub fun deposit(token: @NFT)
        pub fun getIDs(): [UInt64]
        pub fun getNFT(id: UInt64): @NFT
        pub fun idExists(id: UInt64): Bool
    }
}