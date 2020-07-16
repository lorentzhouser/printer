<template>
    <nav id="main-navigation">
        <a href="/" id="leo-logo" class="nav-item">
            <img src="../assets/img/Logo/Inverse.svg" alt="Leonardo-logoen">
        </a>
        <div id="hamburger" class="closed">
            <div class="bar"></div>
            <div id="middle" class="bar"></div>
        </div>
        <ul class="item-list">
            <li id="close-nav" class="nav-item"><img src="../assets/img/icons/close_white.svg" alt="close"></li>
            <li class="nav-item dropdown">
                <span>Student</span>
                <ul>
                    <li><a class="nav-item" href="">Tips og triks</a></li>
                    <li class=""><a class="nav-item" href="">Fag</a></li>
                    <li class=""><a class="nav-item" href="">Boksalg</a></li>
                    <li><a class="nav-item" href="">Jobb</a></li>
                    <li class=""><a class="nav-item" href="" disabled="">Ny student?</a></li>
                    <li class=""><a class="nav-item" href="">Utveksling</a></li>
                    <li class=""><a class="nav-item" href="">Klasseturer</a></li>
                </ul>
            </li>

            <li class="nav-item dropdown">
                <span>Leonardo</span>
                <ul>
                    <li class="selected"><a class="nav-item"
                            href="">Komiteer</a></li>
                    <li class="selected"><a class="nav-item"
                            href="">TheSign</a></li>
                    <li class="selected"><a class="nav-item"
                            href="">Om oss</a></li>
                    <!-- <% if(me) { %> -->
                    <!-- <li class="selected"><a class="nav-item"
                            href="">Vedtekter</a></li> -->
                    <!-- <% } %> -->
                </ul>
            </li>

            <li><a class="nav-item" href="">Prosjekter</a></li>

            <li><a class="nav-item" href="">Arrangementer</a></li>

            <li><a class="nav-item" href="/job-reservations">Print</a></li>

            <!-- <% if(me) { %> -->
            <!-- <li><a class="nav-item user selected" href="/account">
                    <div class="face">
                        <div class="eyes left"></div>
                        <div class="eyes right"></div>
                        <div class="mouth"></div>
                    </div>Min side
                </a></li> -->
            <!-- <% } else { %> -->
            <li><a class="nav-item login" href="/login">Logg inn</a></li>
            <!-- <% } %> -->
        </ul>
    </nav> 
</template>

<script>
export default {
    name: 'NavBar',
}
</script>

<style lang="scss" scoped>

$hamburger-bp: $xl;

#main-navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem $body-padding;
  z-index: $z-navbar;
  background: $background-color;

  #leo-logo {
    display: inline-block;
    z-index: 10;
  }

  #hamburger {
    cursor: pointer;
    position: absolute;
    right: $body-padding * 2;
    top: 2rem;
    z-index: $z-navbar + 1;

    @media screen and (min-width: $hamburger-bp + 1) {
      display: none;
    }

    .bar {
      width: 24px;
      height: 3px;
      background: $black;
      margin-bottom: 4px;

      &:last-child {
        width: 18px;
        margin-right: 0;
        margin-left: auto;
      }
    }
  }

  // Desktop navigation
  @media screen and (min-width: $hamburger-bp + 1) {
    display: flex;
    align-items: center;

    .item-list {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: $xl;
      margin-left: 5rem;
    }

    #close-nav {
      display: none;
    }

    li {
      list-style-type: none;
      display: inline-flex;
      align-items: center;
      margin-right: 3rem;

      &.gray {

        &,
        >a {
          color: gray;
        }
      }
    }

    .nav-item {
      position: relative;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 200ms ease-in-out;
      color: $dark-gray;

      &:hover {
        color: $black;
      }


      &.selected,
      li.selected {
        font-weight: bold;

        li:not(.selected) {
          font-weight: normal;
        }
      }

      &.user,
      &.login {
        position: absolute;
        right: 5%;
        display: flex;
        align-items: center;

        .face {
          position: absolute;
          right: -32px;
        }

        &:hover .face .mouth {
          transform: translateX(-50%) scaleX(1);
        }
      }

      &.dropdown {
        cursor: default;

        &:hover {
          ul {
            transform: translateY(0);
            pointer-events: all;
            opacity: 1;
          }
        }
      }

      ul {
        margin: 0;
        display: flex;
        align-items: center;
        position: absolute;
        pointer-events: none;
        top: 0;
        padding: 3rem 0 2rem;
        transform: translateY(-10px);
        transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;
        opacity: 0;

        li {
          display: inline-block;
          margin-right: 2vw;
          white-space: nowrap;
        }
      }
    }
  }

  // Mobile navigation
  @media screen and (max-width: $hamburger-bp) {
    #hamburger:not(.closed) {
      display: none;
    }

    #hamburger.closed {
      +.item-list {
        transform: translateX(100%);
      }
    }

    .face {
      display: none;
    }

    #close-nav {
      text-align: right;
      padding-top: 1.5rem;
    }

    .item-list {
      position: fixed;
      background: $black;
      top: 0;
      right: 0;
      width: 90vw;
      height: 100vh;
      overflow-y: scroll;
      padding-bottom: 4rem;
      transform: translateX(0);
      transition: transform 200ms ease-in-out;
      @include no-select;

      li {
        list-style-type: none;
      }

      .nav-item,
      .nav-item.dropdown span {
        position: relative;
        display: block;
        border-bottom: $border-width solid white;
        color: white;
        padding: 1rem 2rem;
        font-size: 1.125rem;
        font-weight: bold;

        &.selected,
        &.selected>a,
        &.selected span {
          color: $dark-gray;
        }

        &.dropdown {
          padding: 0 2rem;

          span {
            margin: 0 -2rem;
            cursor: pointer;
          }

          ul {
            transform-origin: top;
          }

          &::after,
          &::before {
            content: '';
            width: 16px;
            height: 3px;
            background: white;
            position: absolute;
            right: 2rem;
            top: 26px;
          }

          &::before {
            transform: rotate(90deg);
            transition: transform 100ms ease-in-out;
          }

          li:first-child a {
            border-top: 0;
          }

          & .nav-item {
            border-width: $border-width 0 0 $border-width;
            border-style: solid;
            border-color: white;
            margin-right: -2rem;
          }

          &:not(.open) {
            ul {
              height: 0;
              transform: scaleY(0);
            }

            span {
              border: 0;
            }
          }

          &.open {
            ul {
              height: auto;
              transform: scaleY(1);
            }

            &::before {
              transform: rotate(0deg);
            }
          }
        }

        a {
          color: white;
        }
      }
    }
  }
}
</style>
